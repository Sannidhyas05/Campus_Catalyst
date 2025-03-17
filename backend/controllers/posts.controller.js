import Post from "../models/posts.models.js";
import User from "../models/users.models.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Active check
export const activeCheck = async (req, res) => {
  return res.status(200).json({ message: "sahi chal ra hai" });
};

//  Create a post

export const createPost = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const userId = new mongoose.Types.ObjectId(decoded.id);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { postType, content, tags, projectDetails } = req.body; //later on I'll use tags to filter out the posts (recommendation system)

    if (!["content", "project"].includes(postType)) {
      return res.status(400).json({ message: "Invalid post type" });
    }

    const media = req.file
      ? [{ url: req.file.path, type: req.file.mimetype.split("/")[0] }]
      : [];

    const postData = {
      userId,
      postType,
      media,
      tags: tags || [],
    };

    if (postType === "content") {
      postData.content = content;
    } else if (postType === "project") {
      postData.projectDetails = projectDetails;
    }

    const post = new Post(postData);
    await post.save();

    user.posts.push(post._id);
    await user.save();

    return res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
