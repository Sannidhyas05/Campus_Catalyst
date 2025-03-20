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

//Like/Unike a post

export const likePost = async (req, res) => {
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

    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.find(
      (like) => like.userId.toString() === userId.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (like) => like.userId.toString() !== userId.toString()
      );
      await post.save();
      return res
        .status(200)
        .json({ message: "Post unliked successfully", post });
    } else {
      post.likes.push({ userId });
      await post.save();
      return res.status(200).json({ message: "Post liked successfully", post });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Comment on a post

export const commentPost = async (req, res) => {
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

    const { postId, content } = req.body;
    if (!postId || !content) {
      return res
        .status(400)
        .json({ message: "Post ID and content are required" });
    }

    console.log("Incoming comment data:", { userId, content });

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = {
      userId: userId,
      content: content,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    return res
      .status(200)
      .json({ message: "Comment added successfully", post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Share a post

export const sharePost = async (req, res) => {
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

    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.shares.push({ userId });
    await post.save();
    return res.status(200).json({ message: "Post shared successfully", post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Get all posts

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "name email");
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// delete a post.................... Later have to look for posts which are inappropriately posted

export const deletePost = async (req, res) => {
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

    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== userId.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await post.deleteOne();
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
