"use client";
import Link from "next/link";
import Stopwatch from "../components/Stopwatch";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Clock, Users, Calendar, Trophy } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navLinks = [
    { 
      href: "/guidelines", 
      text: "Guidelines",
      icon: Sparkles,
      color: "from-pink-500 to-rose-500",
      shadowColor: "shadow-pink-500/20"
    },
    { 
      href: "/food-timing", 
      text: "Food Timing Schedule",
      icon: Clock,
      color: "from-cyan-500 to-blue-500",
      shadowColor: "shadow-blue-500/20"
    },
    { 
      href: "/meeting-links", 
      text: "Meeting Links",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      shadowColor: "shadow-green-500/20"
    },
    { 
      href: "/events", 
      text: "Brief About Events",
      icon: Calendar,
      color: "from-purple-500 to-violet-500",
      shadowColor: "shadow-purple-500/20"
    }
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
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Mouse follow effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Logo Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl flex justify-between items-center px-8 py-8 z-20"
      >
        {/* Event Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-75 blur group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
            <img 
              src="/api/placeholder/150/60" 
              alt="Event Logo" 
              className="h-12 w-auto"
            />
          </div>
        </motion.div>

        {/* Jain University Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-75 blur group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
            <img 
              src="/api/placeholder/150/60" 
              alt="Jain University Logo" 
              className="h-12 w-auto"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Main content container with timer centered */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl px-4 gap-12">
        {/* Timer section - now centered */}
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

        {/* Navigation links in a grid layout */}
        <motion.nav 
          variants={staggerContainer} 
          initial="initial" 
          animate="animate"
          className="w-full max-w-4xl"
        >
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                variants={fadeInUp}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="transform origin-left"
              >
                <Link href={link.href}>
                  <motion.div
                    className={`group relative p-1 rounded-xl ${link.shadowColor} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      animate={hoveredIndex === index ? {
                        background: [
                          `linear-gradient(0deg, ${link.color})`,
                          `linear-gradient(360deg, ${link.color})`
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    <div className="relative bg-gray-800/90 p-6 rounded-lg backdrop-blur-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <motion.div
                            initial={{ rotate: 0 }}
                            animate={hoveredIndex === index ? { rotate: 360 } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            <link.icon className={`w-6 h-6 bg-gradient-to-r ${link.color} bg-clip-text text-transparent`} />
                          </motion.div>
                          <span className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {link.text}
                          </span>
                        </div>
                        <motion.div
                          animate={hoveredIndex === index ? 
                            { x: [0, 5, 0], transition: { duration: 1, repeat: Infinity }} : 
                            { x: 0 }
                          }
                        >
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                        </motion.div>
                      </div>
                      <motion.div
                        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${link.color}`}
                        initial={{ width: "0%" }}
                        animate={hoveredIndex === index ? { width: "100%" } : { width: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.nav>
      </div>
    </div>
  );
}