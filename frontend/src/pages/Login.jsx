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
    <div className="min-h-screen max-w-full  flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-4">
      <motion.form
        onSubmit={go}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 rounded-3xl bg-white shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome Back
        </h2>
        {err && <p className="text-red-600 text-sm text-center">{err}</p>}

        <div className="flex flex-col space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full px-4 py-3 rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transform transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-500">
          Don't have an account?{" "}
          <span
            onClick={() => nav("/register")}
            className="text-purple-600 font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </motion.form>
    </div>
  );
}
