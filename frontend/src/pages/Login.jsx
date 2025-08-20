import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { useAuth } from "../../states/auth";
import { motion } from "framer-motion";

export default function Login() {
  const { setAuth } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const go = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setAuth(data.user, data.token);
      nav("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <motion.form
        onSubmit={go}
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-10 space-y-6 rounded-3xl bg-white dark:bg-black text-black dark:text-white shadow-2xl border border-gray-200 dark:border-gray-700"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center"
        >
          Welcome Back
        </motion.h2>

        {err && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white bg-black text-sm text-center"
          >
            {err}
          </motion.p>
        )}

        <div className="flex flex-col space-y-5">
          <motion.input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            whileFocus={{ scale: 1.02 }}
            className="w-full px-5 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition shadow-inner"
            required
          />
          <motion.input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            whileFocus={{ scale: 1.02 }}
            className="w-full px-5 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition shadow-inner"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold shadow-lg hover:shadow-xl transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 dark:text-gray-400"
        >
          Don't have an account?{" "}
          <span
            onClick={() => nav("/register")}
            className="font-semibold cursor-pointer hover:underline text-black dark:text-white"
          >
            Sign up
          </span>
        </motion.p>
      </motion.form>
    </div>
  );
}
