"use client";

import Link from "next/link";
import Stopwatch from "../components/Stopwatch";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navLinks = [
    { href: "/guidelines", text: "Guidelines" },
    { href: "/food-timing", text: "Food Timing Schedule" },
    { href: "/meeting-links", text: "Meeting Links" },
    { href: "/events", text: "Brief About Events" },
    { href: "/make-a-thon", text: "Make-A-Thon Competition" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col justify-center items-center px-4 relative overflow-hidden">
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

      <div className="relative w-full max-w-2xl z-10">
        {/* Timer section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mb-12"
        >
          <div className="bg-gray-800/40 p-8 rounded-2xl backdrop-blur-md border border-purple-500/20 shadow-2xl">
            <Stopwatch />
          </div>
        </motion.div>

        {/* Navigation links */}
        <motion.nav variants={staggerContainer} initial="initial" animate="animate">
          <motion.ul className="space-y-3">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.href}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="transform origin-left"
              >
                <Link href={link.href}>
                  <div className="group relative bg-gray-800/40 p-6 rounded-xl text-gray-100 text-lg font-medium transition-all duration-300 backdrop-blur-md border border-purple-500/20 shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30">
                    {/* Gradient hover effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className="relative z-10">{link.text}</span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>
      </div>
    </div>
  );
}