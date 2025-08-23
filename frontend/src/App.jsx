import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Problemset from "./pages/Problemset.jsx";
import Navbar from "./components/Navbar.jsx";
import { useAuth } from "../states/auth.js";

export default function App() {
  const { u } = useAuth();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-zinc-900">
      <Navbar />
      <main className="px-4 sm:px-6 md:px-8 lg:px-12 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/problemset"
            element={
              u ? (
                <Problemset />
              ) : (
                <div className="p-4 text-center text-sm sm:text-base">
                  Login required.
                </div>
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}
