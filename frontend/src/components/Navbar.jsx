import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../states/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { u, logout, isAuth } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    nav("/");
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white shadow-md sticky top-0 z-50 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="text-2xl font-extrabold text-black tracking-wide hover:text-gray-600 transition-colors duration-200"
          >
            ProblemIterator
          </Link>
        </motion.div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/problemset"
              className="text-black font-medium hover:text-gray-600 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-black/5"
            >
              Problemset
            </Link>
          </motion.div>

          {isAuth() ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
                  <span className="text-black font-semibold text-base">
                    {(u?.name || "User").charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-black font-medium text-sm sm:text-base">
                  {u?.name || "User"}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-6 py-2 bg-black text-white rounded-2xl hover:bg-gray-800 font-semibold shadow-md transition-colors duration-200"
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <div className="flex gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="px-6 py-2 bg-black text-white font-semibold rounded-2xl shadow-md hover:bg-gray-800 transition-all duration-200"
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
                  className="px-6 py-2 bg-white text-black border border-black font-semibold rounded-2xl shadow-md hover:bg-black/5 transition-all duration-200"
                >
                  Login
                </Link>
              </motion.div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white shadow-md px-6 py-4 space-y-4"
          >
            <Link
              to="/problemset"
              onClick={() => setOpen(false)}
              className="block text-black font-medium hover:text-gray-600 transition-colors duration-200"
            >
              Problemset
            </Link>

            {isAuth() ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
                    <span className="text-black font-semibold">
                      {(u?.name || "User").charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-black font-medium">
                    {u?.name || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-2 bg-black text-white rounded-2xl hover:bg-gray-800 font-semibold shadow-md transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="w-full px-6 py-2 bg-black text-white font-semibold rounded-2xl shadow-md hover:bg-gray-800 transition-all duration-200 text-center"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="w-full px-6 py-2 bg-white text-black border border-black font-semibold rounded-2xl shadow-md hover:bg-black/5 transition-all duration-200 text-center"
                >
                  Login
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
