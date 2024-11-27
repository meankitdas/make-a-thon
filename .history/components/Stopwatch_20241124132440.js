"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle, RefreshCcw } from 'lucide-react';

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

  // Progress animation calculation
  const progress = (timeLeft / 10) * 100; // Assuming 10 is the initial time

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
    <div className="relative p-8">
      {/* Background progress ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(16, 185, 129, 0.1)"
          strokeWidth="2"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(16, 185, 129, 0.5)"
          strokeWidth="2"
          strokeDasharray="283"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
          transition={{ duration: 0.5, ease: "linear" }}
        />
      </svg>

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Timer header */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-6"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Clock className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-semibold text-emerald-300">Time Remaining</h2>
        </motion.div>

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
                {/* Pulse effect on hover */}
                <AnimatePresence>
                  {isHovered === index && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-emerald-500/10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.2 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
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