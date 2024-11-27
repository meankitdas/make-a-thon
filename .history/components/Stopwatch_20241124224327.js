import axios from "axios";
import { useState, useEffect } from "react";

const Stopwatch = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [completed, setCompleted] = useState(false);
  const timerId = "timer-123"; // Unique ID for the timer
  const timerDuration = 600; // Example: 10 minutes (600 seconds)

  // Fetch or create a timer on mount
  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/timer/${timerId}`);
        setTimeLeft(response.data.timer.remainingTime);
        setCompleted(response.data.timer.completed);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Timer doesn't exist, create one
          await axios.post("http://localhost:5000/timer", { id: timerId, duration: timerDuration });
          setTimeLeft(timerDuration);
        } else {
          console.error("Failed to fetch timer:", error);
        }
      }
    };

    fetchTimer();
  }, []);

  // Update timer countdown
  useEffect(() => {
    let interval;
    if (timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setCompleted(true);
      axios.put(`http://localhost:5000/timer/${timerId}`, { completed: true });
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div>
      {completed ? <h1>Timer Completed!</h1> : <h1>Time Left: {timeLeft}s</h1>}
    </div>
  );
};

export default Stopwatch;
