"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Stopwatch from "../components/Stopwatch";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  Calendar,
  Trophy,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const countDownDate = new Date("Jan 5, 2030 15:37:25").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setCountdown("EXPIRED");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    {
      href: "/guidelines",
      text: "Guidelines",
      icon: Sparkles,
      color: "from-pink-500 to-rose-500",
      shadowColor: "shadow-pink-500/20",
      bgGradient: "from-pink-500/10 via-rose-500/10 to-pink-500/10",
    },
    {
      href: "/food-timing",
      text: "Food Timing Schedule",
      icon: Clock,
      color: "from-cyan-500 to-blue-500",
      shadowColor: "shadow-blue-500/20",
      bgGradient: "from-cyan-500/10 via-blue-500/10 to-cyan-500/10",
    },
    {
      href: "/meeting-links",
      text: "Meeting Links",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      shadowColor: "shadow-green-500/20",
      bgGradient: "from-green-500/10 via-emerald-500/10 to-green-500/10",
    },
    {
      href: "/events",
      text: "Brief About Events",
      icon: Calendar,
      color: "from-purple-500 to-violet-500",
      shadowColor: "shadow-purple-500/20",
      bgGradient: "from-purple-500/10 via-violet-500/10 to-purple-500/10",
    },
    {
      href: "/make-a-thon",
      text: "Make-A-Thon Competition",
      icon: Trophy,
      color: "from-amber-500 to-orange-500",
      shadowColor: "shadow-orange-500/20",
      bgGradient: "from-amber-500/10 via-orange-500/10 to-amber-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center px-4 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, purple 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, purple 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, purple 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, purple 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Mouse follow effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Timer Display */}
      <div className="mt-8">
        <p className="text-center text-white text-4xl">{countdown}</p>
      </div>

      {/* Rest of your components like Stopwatch and navigation */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl px-4 gap-16">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full max-w-2xl"
        >
          <div className="bg-gray-800/40 p-8 rounded-2xl backdrop-blur-md border border-purple-500/20 shadow-2xl">
            <Stopwatch />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
