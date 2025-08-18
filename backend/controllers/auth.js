import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  console.log(req);
  const { name, email, password } = req.body;
  const exist = await User.findOne({ email });
  if (exist) return res.status(409).json({ msg: "exists" });
  const hash = await bcrypt.hash(password, 10);
  const u = await User.create({ name, email, password: hash });
  res.json({ id: u._id, name: u.name, email: u.email });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u) return res.status(401).json({ msg: "bad" });
  const ok = await bcrypt.compare(password, u.password);
  if (!ok) return res.status(401).json({ msg: "bad" });
  const token = jwt.sign(
    { id: u._id, name: u.name, email: u.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.json({ token, user: { id: u._id, name: u.name, email: u.email } });
};
