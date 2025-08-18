import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    question: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
