"use client";
import Link from "next/link";
import Stopwatch from "../components/Stopwatch";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="text-center bg-gray-900 min-h-screen flex flex-col justify-center items-center text-white">
      {/* Stopwatch with a unique, elegant design */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mb-8"
      >
        <Stopwatch />
      </motion.div>

      {/* Navigation with animated links */}
      <nav>
        <ul className="space-y-6">
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link href="/guidelines">
              <div className="text-xl hover:text-gray-400 hover:underline transition-all duration-300">
                Guidelines
              </div>
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link href="/food-timing">
              <div className="text-xl hover:text-gray-400 hover:underline transition-all duration-300">
                Food Timing Schedule
              </div>
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="/meeting-links">
              <div className="text-xl hover:text-gray-400 hover:underline transition-all duration-300">
                Meeting Links
              </div>
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link href="/events">
              <div className="text-xl hover:text-gray-400 hover:underline transition-all duration-300">
                Brief About Events
              </div>
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="/make-a-thon">
              <div className="text-xl hover:text-gray-400 hover:underline transition-all duration-300">
                Make-A-Thon Competition
              </div>
            </Link>
          </motion.li>
        </ul>
      </nav>
    </div>
  );
}
