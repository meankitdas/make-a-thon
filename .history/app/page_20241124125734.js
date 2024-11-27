"use client";
import Link from "next/link";
import Stopwatch from "../components/Stopwatch";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex flex-col justify-center items-center">
      {/* Stopwatch with fade-in effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Stopwatch />
      </motion.div>

      {/* Navigation with animated links */}
      <nav className="mt-8">
        <ul className="space-y-4">
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link href="/guidelines">
              < className="text-white text-xl hover:text-yellow-300 hover:underline transition-all duration-300">
                Guidelines
              </>
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link href="/food-timing">
              <a className="text-white text-xl hover:text-yellow-300 hover:underline transition-all duration-300">
                Food Timing Schedule
              </a>
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="/meeting-links">
              <a className="text-white text-xl hover:text-yellow-300 hover:underline transition-all duration-300">
                Meeting Links
              </a>
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link href="/events">
              <a className="text-white text-xl hover:text-yellow-300 hover:underline transition-all duration-300">
                Brief About Events
              </a>
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="/make-a-thon">
              <a className="text-white text-xl hover:text-yellow-300 hover:underline transition-all duration-300">
                Make-A-Thon Competition
              </a>
            </Link>
          </motion.li>
        </ul>
      </nav>
    </div>
  );
}
