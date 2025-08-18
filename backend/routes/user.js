import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  setProgress,
  getBookmarks,
  toggleBookmark,
} from "../controllers/user.js";
const r = Router();
r.use(auth);
r.post("/progress", setProgress);
r.get("/bookmarks", getBookmarks);
r.post("/bookmark", toggleBookmark);
export default r;
