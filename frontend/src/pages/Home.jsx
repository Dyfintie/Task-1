import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-blue-50 to-purple-50 py-20">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
      >
        Welcome to <span className="text-blue-600">WebD-Task</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg md:text-xl text-gray-700 max-w-3xl mb-12"
      >
        Sharpen your coding skills with structured problem sets. Track your
        progress, bookmark questions, and learn smarter — not harder.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <button
          onClick={() => nav("/problemset")}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transform transition"
        >
          Explore Problem Set
        </button>
        <button
          onClick={() => nav("/register")}
          className="px-8 py-4 rounded-2xl bg-white text-purple-600 font-bold shadow-lg hover:scale-105 transform transition"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
}
