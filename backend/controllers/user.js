import User from "../models/User.js";

export const setProgress = async (req, res) => {
  const { q, done } = req.body;
  const u = await User.findById(req.user.id);
  const i = u.progress.findIndex((p) => p.q.toString() === q);
  if (i > -1) u.progress[i].done = !!done;
  else u.progress.push({ q, done: !!done });
  await u.save();
  res.json({ ok: true });
};

export const getBookmarks = async (req, res) => {
  const u = await User.findById(req.user.id).populate("bookmarks");
  res.json({ items: u.bookmarks });
};

export const toggleBookmark = async (req, res) => {
  const { q } = req.body;
  const u = await User.findById(req.user.id);
  const i = u.bookmarks.findIndex((x) => x.toString() === q);
  if (i > -1) u.bookmarks.splice(i, 1);
  else u.bookmarks.push(q);
  await u.save();
  res.json({ ok: true });
};
