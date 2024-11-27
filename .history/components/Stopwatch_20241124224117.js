"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle, Timer } from 'lucide-react';

const Stopwatch = () => {
  const [timeLeft, setTimeLeft] = useState(10); // Initial time in seconds
  const [completed, setCompleted] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else {
      clearInterval(timer);
      setCompleted(true);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (completed) {
      const audio = new Audio("/event-complete.mp3");
      audio.play();
    }
  }, [completed]);

  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return { hours, minutes, secs };
  };

  const { hours, minutes, secs } = formatTime(timeLeft);

  if (completed) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-8 relative"
      >
        {/* Celebration particles */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400"
              initial={{
                x: "50%",
                y: "50%",
                scale: 0,
                opacity: 1
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: Math.random() * 2,
                opacity: 0
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </motion.div>

        <motion.div
          className="relative z-10 bg-gray-800/60 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/30 shadow-lg"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle className="w-8 h-8 text-emerald-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Event Completed!
            </h1>
          </motion.div>

          <motion.p
            className="text-emerald-300/80 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Thank you for participating!
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="p-8">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Timer header with animated gradient bar */}
        <div className="relative mb-8">
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 rounded-lg blur"
            animate={{
              background: [
                "linear-gradient(to right, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.2), rgba(16, 185, 129, 0.2))",
                "linear-gradient(to right, rgba(20, 184, 166, 0.2), rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.2))"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="relative flex items-center justify-center gap-3 py-3 bg-gray-800/60 backdrop-blur-md rounded-lg border border-emerald-500/30"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Timer className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Time Remaining
            </h2>
          </motion.div>
        </div>

        {/* Time units */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          {[
            { value: hours, label: "HOURS" },
            { value: minutes, label: "MINUTES" },
            { value: secs, label: "SECONDS" }
          ].map((unit, index) => (
            <motion.div
              key={unit.label}
              className="relative"
              onHoverStart={() => setIsHovered(index)}
              onHoverEnd={() => setIsHovered(null)}
            >
              <motion.div
                className="bg-gray-800/60 backdrop-blur-md rounded-xl p-6 border border-emerald-500/30 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Animated gradient on hover */}
                <AnimatePresence>
                  {isHovered === index && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        background: [
                          "linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1), rgba(16, 185, 129, 0.1))",
                          "linear-gradient(to right, rgba(20, 184, 166, 0.1), rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1))"
                        ]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </AnimatePresence>

                <motion.span
                  className="block text-4xl font-bold text-emerald-400 mb-2 relative"
                  key={unit.value}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {unit.value}
                </motion.span>
                <span className="text-xs text-emerald-300/80 font-medium tracking-wider">
                  {unit.label}
                </span>
              </motion.div>

              {/* Separator */}
              {index < 2 && (
                <motion.span
                  className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-emerald-400 text-2xl"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  :
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Stopwatch;