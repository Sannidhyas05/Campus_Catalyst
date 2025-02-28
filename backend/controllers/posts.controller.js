import Post from "../models/posts.models.js";

export const activeCheck = async (req, res) => {
  return res.status(200).json({ message: "sahi chal ra hai" });
};
