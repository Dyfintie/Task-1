import "dotenv/config";
import mongoose from "mongoose";
import axios from "axios";
import Category from "./models/Category.js";
import CategoryList from "./models/CatgoryList.js";
import Question from "./models/Question.js";
import connectMongoDB from "./lib/mongodb.js";

try {
  await connectMongoDB();
  const { data } = await axios.get(process.env.SEED_URL);

  await Category.deleteMany({});
  await Question.deleteMany({});
  await CategoryList.deleteMany({});

  const arr = data.data;
  const categoryRefs = [];

  for (const item of arr) {
    const category = await Category.create({
      title: item.title,
      questions: [],
    });
    categoryRefs.push({ _id: category._id, title: category.title });

    const questionObjects = [];
    for (const q of item.ques) {
      const question = await Question.create({
        id: q.id,
        question: q.title,
        url: q.yt_link,
      });
      questionObjects.push(question); // keep full object in category.questions if needed
    }

    await Category.findByIdAndUpdate(category._id, {
      questions: questionObjects,
    });
  }

  // Create CategoryList
  await CategoryList.create({ categories: categoryRefs });

  console.log("Seeding completed with CategoryList.");
} catch (error) {
  console.error("Seeding error:", error);
}
