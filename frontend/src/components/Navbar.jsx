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

        <div className="flex items-center gap-6">
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
              <div className="flex flex-row items-center gap-1">
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
                className=" btn px-6 py-2 bg-black text-white rounded-2xl hover:bg-gray-200 font-semibold shadow-md transition-colors duration-200"
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
      </div>
    </motion.nav>
  );
}
