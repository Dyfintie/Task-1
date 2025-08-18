import { Router } from "express";
import { register, login } from "../controllers/auth.js";
import { authLimiter } from "../middleware/rate.js";
const r = Router();
r.post("/register", authLimiter, register);
r.post("/login", authLimiter, login);
export default r;
