import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-6  overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold leading-tight relative text-black"
      >
        Welcome to{" "}
        <span className="bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
          ProblemIterator
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
          className=" border-2 border-black px-8 py-4 rounded-2xl bg-white text-black font-bold shadow-lg hover:bg-gray-200 hover:scale-105 transform transition"
        >
          Explore Problem Set
        </button>
        <button
          onClick={() => nav("/register")}
          className=" border-2 border-black px-8 py-4 rounded-2xl bg-white text-black font-bold shadow-lg hover:bg-gray-200 hover:scale-105 transform transition"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
}
