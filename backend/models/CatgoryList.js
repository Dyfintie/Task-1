import mongoose from "mongoose";

const CategoryListSchema = new mongoose.Schema({
  categories: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
      title: String,
    },
  ],
});

export default mongoose.model("CategoryList", CategoryListSchema);
