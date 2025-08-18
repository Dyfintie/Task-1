import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: String,
  question: String,
  url: String,
});
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    questions: [questionSchema],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
