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
import Image from "next/image";
import Jain from "@/public/jain.png";
import crce from "@/public/crce.png";

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
  const [isClient, setIsClient] = useState(false); // Track client-only rendering

  useEffect(() => {
    setIsClient(true); // Trigger client-side rendering
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isClient]);

  const navLinks = [
    {
      href: "https://wool-cupcake-b05.notion.site/Guidelines-for-Make-a-Thon-Build-Innovative-Tech-Prototypes-1482610ad04280c9b260dbc0f2822d9c",
      text: "Guidelines",
      icon: Sparkles,
      color: "from-pink-500 to-rose-500",
      shadowColor: "shadow-pink-500/20",
      bgGradient: "from-pink-500/10 via-rose-500/10 to-pink-500/10",
    },
    {
      href: "https://light-caption-d04.notion.site/149c1970113f808cacbae808ee087365?v=0aa601184cab47aabb4a7e5381cf7b4e",
      text: "Food Timing Schedule",
      icon: Clock,
      color: "from-cyan-500 to-blue-500",
      shadowColor: "shadow-blue-500/20",
      bgGradient: "from-cyan-500/10 via-blue-500/10 to-cyan-500/10",
    },
    {
      href: "https://wool-cupcake-b05.notion.site/Event-Rules-61f4feb83088464d9af8954c9e705ca8",
      text: "Rules and Regulations",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      shadowColor: "shadow-green-500/20",
      bgGradient: "from-green-500/10 via-emerald-500/10 to-green-500/10",
    },
    {
      href: "https://wool-cupcake-b05.notion.site/Make-A-Thon-26th-November-2024-14a2610ad04280f9a07acc2727a1e49a",
      text: "26 Nov 202 Schedule",
      icon: Calendar,
      color: "from-purple-500 to-violet-500",
      shadowColor: "shadow-purple-500/20",
      bgGradient: "from-purple-500/10 via-violet-500/10 to-purple-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center px-4 relative overflow-hidden">
      {/* Animated background gradient */}
      {isClient && (
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
      )}

      {/* Mouse follow effect */}
      {isClient && (
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      )}

      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl flex justify-between items-center px-8 py-8 z-20"
      >
        {/* Event Logo */}
        <div className="relative bg-gray-300/50 backdrop-blur-sm rounded-lg p-2 border border-purple-500/20">
          <Image src={Jain} alt="Event Logo" width={200} height={200} />
        </div>

        {/* University Logo */}
        <div className="relative bg-gray-300/50 backdrop-blur-sm rounded-lg p-2 border border-purple-500/20">
          <Image
            src={crce}
            alt="Jain University Logo"
            width={100}
            height={100}
          />
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl px-4 gap-16">
        {/* Timer Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="w-full max-w-2xl"
        >
          <div className="bg-gray-800/40 p-8 rounded-2xl backdrop-blur-md border border-purple-500/20 shadow-2xl">
            <Stopwatch />
          </div>
        </motion.div>

        {/* Navigation Links */}
        <motion.nav
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="w-full max-w-4xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                variants={fadeInUp}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <Link href={link.href} target="_blank">
                  <div className="relative group">
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r ${link.color} rounded-xl opacity-0 group-hover:opacity-75 blur transition duration-500`}
                    />
                    <div
                      className={`relative flex items-center bg-gradient-to-r ${link.bgGradient} p-6 rounded-xl backdrop-blur-md border border-white/10`}
                    >
                      <div className="relative mr-6">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${link.color} rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        />
                        <div className="relative p-3 rounded-lg bg-gray-900/50">
                          {link.icon && (
                            <link.icon className="w-8 h-8 text-white" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-lg font-medium text-white">
                          {link.text}
                        </span>
                        <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.nav>
      </div>
    </div>
  );
}
