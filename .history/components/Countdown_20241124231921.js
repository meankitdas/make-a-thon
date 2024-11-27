import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60 * 1000); // 24 hours

  useEffect(() => {
    // Connect to the backend
    socket = io('http://localhost:4000');

    // Listen for countdown updates
    socket.on('countdown', (data) => {
      setTimeLeft(data.remainingTime);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Format time into HH:MM:SS
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div style={{ textAlign: 'center', fontSize: '2rem', marginTop: '20px' }}>
      <h1>Hackathon Countdown</h1>
      <p>{formatTime(timeLeft)}</p>
    </div>
  );
}
