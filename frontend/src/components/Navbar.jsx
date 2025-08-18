import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../states/auth";
import { motion } from "framer-motion";

export default function Navbar() {
  const { u, logout, isAuth } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/");
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full  bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="text-2xl font-extrabold text-white tracking-wide hover:text-yellow-200 transition-colors duration-200"
          >
            Task-1
          </Link>
        </motion.div>

        <div className="flex items-center gap-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/problemset"
              className="text-white font-medium hover:text-yellow-200 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/20"
            >
              Problemset
            </Link>
          </motion.div>

          {isAuth() ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-base">
                    {(u?.name || "User").charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-white font-medium hidden sm:block text-base">
                  {u?.name || "User"}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-3 py-3 bg-red-500 rounded-2xl hover:bg-red-600 text-white font-semibold shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  Register
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-2xl shadow-lg hover:bg-gray-100 transition-all duration-200"
                >
                  Login
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
