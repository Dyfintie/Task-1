import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-beige-100 via-beige-200 to-beige-300 overflow-hidden">
      {/* Decorative blobs with beige/black vibe */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold leading-tight relative text-black"
      >
        Welcome to{" "}
        <span className="bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
          WebD-Task
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg md:text-xl text-gray-800 max-w-2xl mb-12"
      >
        Sharpen your coding skills with structured problem sets. Track your
        progress, bookmark questions, and learn smarter — not harder.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-col md:flex-row gap-6"
      >
        <button
          onClick={() => nav("/problemset")}
          className="btn border-2 border-black px-8 py-4 rounded-2xl bg-black text-white font-bold shadow-lg hover:scale-105 transform transition"
        >
          Explore Problem Set
        </button>
        <button
          onClick={() => nav("/register")}
          className="btn border-2 px-8 py-4 rounded-2xl bg-white text-black font-bold shadow-lg hover:bg-gray-100 hover:scale-105 transform transition"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
}
