const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// In-memory storage for demo purposes
const timers = {};

// Create a new timer
app.post("/timer", (req, res) => {
  const { id, duration } = req.body;
  if (!id || !duration) {
    return res.status(400).json({ error: "Timer ID and duration are required." });
  }

  timers[id] = {
    duration,
    remainingTime: duration,
    completed: false,
    createdAt: Date.now(),
  };

  return res.status(201).json({ message: "Timer created successfully", timer: timers[id] });
});

// Get timer state
app.get("/timer/:id", (req, res) => {
  const { id } = req.params;
  const timer = timers[id];
  if (!timer) {
    return res.status(404).json({ error: "Timer not found" });
  }

  const elapsed = Math.floor((Date.now() - timer.createdAt) / 1000);
  const remainingTime = Math.max(timer.duration - elapsed, 0);
  timer.remainingTime = remainingTime;
  timer.completed = remainingTime === 0;

  return res.status(200).json({ timer });
});

// Update timer state (mark as completed manually)
app.put("/timer/:id", (req, res) => {
  const { id } = req.params;
  const timer = timers[id];
  if (!timer) {
    return res.status(404).json({ error: "Timer not found" });
  }

  timer.completed = true;
  timer.remainingTime = 0;

  return res.status(200).json({ message: "Timer updated successfully", timer });
});

// Delete a timer
app.delete("/timer/:id", (req, res) => {
  const { id } = req.params;
  if (!timers[id]) {
    return res.status(404).json({ error: "Timer not found" });
  }

  delete timers[id];
  return res.status(200).json({ message: "Timer deleted successfully" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
