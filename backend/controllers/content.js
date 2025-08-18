import Category from "../models/Category.js";

export const getContent = async (req, res) => {
  try {
    const { categoryId, search = "", page = 1, limit = 10 } = req.query;

    if (!categoryId) {
      return res.status(400).json({ error: "categoryId is required" });
    }

    const p = Math.max(Number(page), 1);
    const l = Math.max(Number(limit), 1);

    const category = await Category.findById(categoryId).lean();
    if (!category) return res.status(404).json({ error: "Category not found" });

    let questions = category.questions || [];
    if (search) {
      const regex = new RegExp(search, "i");
      questions = questions.filter((q) => regex.test(q.title));
    }

    const total = questions.length;
    const paginatedQuestions = questions.slice((p - 1) * l, p * l);

    res.json({
      page: p,
      limit: l,
      total,
      totalPages: Math.ceil(total / l),
      questions: paginatedQuestions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).select("title _id").lean();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
