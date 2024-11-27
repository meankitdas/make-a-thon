"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Stopwatch = () => {
  const [timeLeft, setTimeLeft] = useState(10); // Initial time in seconds
  const [completed, setCompleted] = useState(false);

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
        className="text-center p-8"
      >
        <motion.h1 
          className="text-4xl font-bold text-emerald-400"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Event Completed! 🎉
        </motion.h1>
        <img src="/confetti.gif" alt="Celebration" className="mx-auto mt-6" />
      </motion.div>
    );
  }

  return (
    <div className="relative p-8">
      {/* Decorative ring */}
      <div className="absolute inset-0 rounded-f border-4 border-emerald-500/20 animate-pulse" />
      
      <motion.div 
        className="relative grid grid-cols-3 gap-4 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Time units */}
        {[
          { value: hours, label: "HOURS" },
          { value: minutes, label: "MINUTES" },
          { value: secs, label: "SECONDS" }
        ].map((unit, index) => (
          <div key={unit.label} className="relative">
            <motion.div 
              className="bg-emerald-900/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="block text-4xl font-bold text-emerald-400 mb-2">
                {unit.value}
              </span>
              <span className="text-xs text-emerald-300/80 font-medium tracking-wider">
                {unit.label}
              </span>
            </motion.div>
            
            {/* Separator */}
            {index < 2 && (
              <span className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-emerald-400 text-2xl">
                :
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Stopwatch;