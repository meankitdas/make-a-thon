"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle, Timer } from "lucide-react";

const socket = io("http://localhost:3000"); // Connect to backend server

const Stopwatch = () => {
  const [timeLeft, setTimeLeft] = useState(10); // Initial time in seconds
  const [completed, setCompleted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Listen for updates from the server
    socket.on("stopwatchUpdate", (data) => {
      const { isRunning, elapsedTime } = data;
      setIsRunning(isRunning);
      setTimeLeft(Math.max(0, Math.floor(elapsedTime / 1000)));
      setCompleted(!isRunning && elapsedTime <= 0);
    });

    return () => {
      socket.off("stopwatchUpdate");
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStart = () => socket.emit("start");
  const handlePause = () => socket.emit("pause");
  const handleReset = () => socket.emit("reset");

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
        <motion.div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-8">
          <motion.div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Event Completed!
            </h1>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="p-8">
      <motion.div className="relative mb-8">
        <motion.div className="flex items-center justify-center gap-3 py-3 bg-gray-800/60 rounded-lg">
          <Timer className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Time Remaining
          </h2>
        </motion.div>
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          {[{ value: hours, label: "HOURS" }, { value: minutes, label: "MINUTES" }, { value: secs, label: "SECONDS" }].map((unit) => (
            <div key={unit.label} className="bg-gray-800/60 rounded-xl p-6">
              <span className="block text-4xl font-bold text-emerald-400 mb-2">{unit.value}</span>
              <span className="text-xs text-emerald-300/80 font-medium">{unit.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex justify-center gap-4">
        <button
          className="bg-emerald-500 text-white px-4 py-2 rounded"
          onClick={handleStart}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded"
          onClick={handlePause}
          disabled={!isRunning}
        >
          Pause
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
