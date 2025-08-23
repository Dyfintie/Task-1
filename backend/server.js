import express from "express";
import connectMongoDB from "./lib/mongodb.js";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import caller from "./middleware/callrec.js";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

app.use(caller);
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/user", userRoutes);

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);
  if (req.method !== "GET" && Object.keys(req.body || {}).length > 0) {
    console.log("Request body:", JSON.stringify(req.body, null, 2));
  }
  if (Object.keys(req.query).length > 0) {
    console.log("Query params:", req.query);
  }
  next();
});

const startServer = async () => {
  try {
    await connectMongoDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
