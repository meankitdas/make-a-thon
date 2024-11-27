"use client";
import Link from "next/link";
import Stopwatch from "../components/Stopwatch";
import { motion } from "framer-motion";

export default function Home() {
  const navLinks = [
    { href: "/guidelines", text: "Guidelines" },
    { href: "/food-timing", text: "Food Timing Schedule" },
    { href: "/meeting-links", text: "Meeting Links" },
    { href: "/events", text: "Brief About Events" },
    { href: "/make-a-thon", text: "Make-A-Thon Competition" },
  ];

  return (
    <div className="min-h-screen bg-indigo-900 flex flex-col justify-center items-center px-4">
      {/* Main content container with subtle gradient overlay */}
      <div className="relative w-full max-w-2xl">
        {/* Timer section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="bg-indigo-800/50 p-8 rounded-2xl backdrop-blur-sm">
            <Stopwatch />
          </div>
        </motion.div>

        {/* Navigation links */}
        <nav>
          <motion.ul 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.2 + index * 0.1,
                }}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <Link href={link.href}>
                  <div className="bg-indigo-800/30 hover:bg-indigo-700/50 p-4 rounded-lg text-indigo-100 text-lg font-medium transition-all duration-300 backdrop-blur-sm">
                    {link.text}
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
    </div>
  );
}