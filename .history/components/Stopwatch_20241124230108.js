"use client";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  Timer,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  CheckCircle,
} from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000";
const socket = io(API_URL);

const Stopwatch = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Connect to WebSocket and handle updates
    socket.on(
      "timerUpdate",
      ({ timeLeft: newTime, isRunning: newIsRunning }) => {
        setTimeLeft(newTime);
        setIsRunning(newIsRunning);
        setCompleted(newTime === 0);
      }
    );

    socket.on("timerCompleted", () => {
      setCompleted(true);
      setIsRunning(false);
    });

    // Get initial timer state
    fetchTimerStatus();

    return () => {
      socket.off("timerUpdate");
      socket.off("timerCompleted");
    };
  }, []);

  const fetchTimerStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/timer/status`);
      const { isRunning: currentIsRunning, timeLeft: currentTime } =
        response.data;
      setIsRunning(currentIsRunning);
      setTimeLeft(currentTime);
      setCompleted(currentTime === 0);
    } catch (err) {
      setError("Failed to fetch timer status");
      console.error(err);
    }
  };

  const handleStart = async () => {
    try {
      await axios.post(`${API_URL}/api/timer/start`);
    } catch (err) {
      setError("Failed to start timer");
      console.error(err);
    }
  };

  const handleStop = async () => {
    try {
      await api.post('/api/timer/stop');
    } catch (err) {
      setError('Failed to stop timer');
      console.error(err);
    }
  };
  

  const handleReset = async () => {
    try {
      await api.post("/api/timer/reset");
      setCompleted(false);
    } catch (err) {
      setError("Failed to reset timer");
      console.error(err);
    }
  };

  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return { hours, minutes, secs };
  };

  const { hours, minutes, secs } = formatTime(timeLeft);

  if (completed) {
    return (
      <div className="text-center p-8">
        <div className="relative z-10 bg-gray-800/60 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/30 shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Event Completed!
            </h1>
          </div>
          <p className="text-emerald-300/80 mt-4">
            Thank you for participating!
          </p>
          <button
            onClick={handleReset}
            className="mt-6 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg text-emerald-400 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Timer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {error && (
        <div className="mb-4 p-4 bg-red-500/20 text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <div className="relative mb-8">
        <div className="relative flex items-center justify-center gap-3 py-3 bg-gray-800/60 backdrop-blur-md rounded-lg border border-emerald-500/30">
          <Timer className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Time Remaining
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-8">
        {[
          { value: hours, label: "HOURS" },
          { value: minutes, label: "MINUTES" },
          { value: secs, label: "SECONDS" },
        ].map((unit, index) => (
          <div
            key={unit.label}
            className="relative"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <div
              className={`bg-gray-800/60 backdrop-blur-md rounded-xl p-6 border border-emerald-500/30 shadow-lg transition-transform duration-200 ${
                isHovered === index ? "scale-105 -translate-y-1" : ""
              }`}
            >
              <span className="block text-4xl font-bold text-emerald-400 mb-2">
                {unit.value}
              </span>
              <span className="text-xs text-emerald-300/80 font-medium tracking-wider">
                {unit.label}
              </span>
            </div>
            {index < 2 && (
              <span className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-emerald-400 text-2xl">
                :
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg text-emerald-400 flex items-center gap-2"
          >
            <PlayCircle className="w-4 h-4" />
            Start
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg text-emerald-400 flex items-center gap-2"
          >
            <PauseCircle className="w-4 h-4" />
            Stop
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg text-emerald-400 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
