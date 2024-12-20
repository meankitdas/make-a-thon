"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Stopwatch = () => {
  const targetDate = new Date("2024-11-26T10:30:25").getTime();
  const [timeLeft, setTimeLeft] = useState(null); // Start as `null` during SSR
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setExpired(true);
        setTimeLeft(0);
      } else {
        setTimeLeft(distance);
      }
    };

    // Initialize on mount
    updateTimer();

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft === null) {
    // Placeholder during SSR
    return <div>Loading...</div>;
  }

  // Format time into hours, minutes, and seconds
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  const isLastHour = timeLeft <= 60 * 60 * 1000;

  if (expired) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-8"
      >
        <motion.h1
          className="text-4xl font-bold text-red-400"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Time Expired! ⏳
        </motion.h1>
        <img src="/expired.gif" alt="Expired" className="mx-auto mt-6" />
      </motion.div>
    );
  }

  return (
    <div className="relative p-8">
      <div className="absolute inset-0 rounded-xl border-4 border-blue-500/20 animate-pulse" />

      <motion.div
        className="relative grid grid-cols-3 gap-4 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {[
          { value: hours, label: "HOURS" },
          { value: minutes, label: "MINUTES" },
          { value: seconds, label: "SECONDS" },
        ].map((unit, index) => (
          <div key={unit.label} className="relative">
            <motion.div
              className={`bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border ${
                isLastHour ? "border-red-500/50" : "border-blue-500/20"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span
                className={`block text-4xl font-bold ${
                  isLastHour ? "text-red-400" : "text-blue-400"
                } mb-2`}
              >
                {unit.value}
              </span>
              <span className="text-xs text-blue-300/80 font-medium tracking-wider">
                {unit.label}
              </span>
            </motion.div>
            {index < 2 && (
              <span className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-blue-400 text-2xl">
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
