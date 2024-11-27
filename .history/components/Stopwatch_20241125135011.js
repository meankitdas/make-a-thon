"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Stopwatch = () => {
  // Set target date and initial state
  const targetDate = new Date("2024-11-26T11:20:25").getTime(); // Update target date
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());
  const [expired, setExpired] = useState(false);

  // Update time left every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setExpired(true);
      } else {
        setTimeLeft(distance);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Format time into days, hours, minutes, and seconds
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const { days, hours, minutes, seconds } = formatTime(timeLeft);

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
        className="relative grid grid-cols-4 gap-4 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Time units */}
        {[
          { value: days, label: "DAYS" },
          { value: hours, label: "HOURS" },
          { value: minutes, label: "MINUTES" },
          { value: seconds, label: "SECONDS" },
        ].map((unit, index) => (
          <div key={unit.label} className="relative">
            <motion.div
              className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="block text-4xl font-bold text-blue-400 mb-2">
                {unit.value}
              </span>
              <span className="text-xs text-blue-300/80 font-medium tracking-wider">
                {unit.label}
              </span>
            </motion.div>
            {/* Separator */}
            {index < 3 && (
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
