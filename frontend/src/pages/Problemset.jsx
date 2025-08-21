import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../lib/api.js";
import { Youtube } from "lucide-react";

export default function Problemset() {
  const [categories, setCategories] = useState([]);
  const [expandedCat, setExpandedCat] = useState(null);
  const [questionsMap, setQuestionsMap] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/content/categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const toggleCategory = async (catId) => {
    if (expandedCat === catId) {
      setExpandedCat(null);
      return;
    }
    setExpandedCat(catId);

    if (!questionsMap[catId]) {
      setLoading(true);
      try {
        const res = await api.get(
          `/content?categoryId=${catId}&page=1&limit=10`
        );
        setQuestionsMap((prev) => ({
          ...prev,
          [catId]: res.data.questions || [],
        }));
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        setQuestionsMap((prev) => ({ ...prev, [catId]: [] }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 pb-15">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-8 text-center text-black"
      >
        Problem Categories
      </motion.h2>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="border border-black rounded-xl overflow-hidden bg-white shadow"
          >
            <button
              className="w-full px-4 py-3 bg-white text-left flex justify-between items-center hover:bg-gray-100 transition"
              onClick={() => toggleCategory(cat._id)}
            >
              <span className="font-medium text-black">{cat.title}</span>
              <span
                className={`transform transition-transform ${
                  expandedCat === cat._id ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>

            <AnimatePresence>
              {expandedCat === cat._id && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 py-2 space-y-2 list-none"
                >
                  {loading ? (
                    <p className="text-gray-500 py-2">Loading questions...</p>
                  ) : questionsMap[cat._id]?.length === 0 ? (
                    <p className="text-gray-500 py-2">
                      No questions in this category.
                    </p>
                  ) : (
                    questionsMap[cat._id].map((q) => (
                      <li
                        key={q._id || q.id}
                        className="py-2 border-b border-gray-300 last:border-b-0 flex justify-between items-center px-2 hover:bg-gray-100 rounded transition"
                      >
                        <span className="text-black">
                          {q.title || q.question}
                        </span>
                        {q.url && (
                          <a
                            href={q.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-black hover:scale-110 transform transition"
                          >
                            <Youtube size={20} color="red" />
                          </a>
                        )}
                      </li>
                    ))
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
