import { Router } from "express";
import { getContent, getCategories } from "../controllers/content.js";

const r = Router();

r.get("/", getContent); 
r.get("/categories", getCategories); 

export default r;
