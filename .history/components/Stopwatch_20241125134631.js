"use client";

import { useState, useEffect } from "react";

const Stopwatch = () => {
  const [timeLeft, setTimeLeft] = useState(10); // 24 hours in seconds
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
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="text-center mt-10">
      {completed ? (
        <div>
          <h1 className="text-4xl font-bold text-green-600">Event Completed! 🎉</h1>
          <img src="/confetti.gif" alt="Celebration" className="mx-auto mt-4" />
        </div>
      ) : (
        <h1 className="text-2xl font-bold text-blue-600">
          Time Left: {formatTime(timeLeft)}
        </h1>
      )}
    </div>
  );
};

export default Stopwatch;
