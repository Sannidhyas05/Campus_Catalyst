import Post from "../models/posts.models.js";
import User from "../models/users.models.js";
import bcrypt from "bcrypt";

// Active check
export const activeCheck = async (req, res) => {
  return res.status(200).json({ message: "sahi chal ra hai" });
};

//export const createPost = async (req, res) => {
