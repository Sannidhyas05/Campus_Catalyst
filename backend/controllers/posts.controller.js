import Post from "../models/posts.models.js";
import User from "../models/users.models.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Active check
export const activeCheck = async (req, res) => {
  return res.status(200).json({ message: "sahi chal ra hai" });
};

// Create a post
export const createPost = async (req, res) => {
  try {
    if (!req.body.content?.trim() && !req.file) {
      return res.status(400).json({ message: "Content or media is required" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const userId = new mongoose.Types.ObjectId(decoded.id);

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const media = req.file
      ? {
          url: `/uploads/${req.file.filename}`,
          type: req.file.mimetype.split("/")[0],
        }
      : null;

    const post = new Post({
      userId,
      postType: "content",
      content: req.body.content || "",
      media: media ? [media] : [],
    });

    await post.save();
    user.posts.push(post._id);
    await user.save();

    return res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Like/Unlike a post
export const likePost = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const userId = new mongoose.Types.ObjectId(decoded.id);

    const { postId } = req.body;
    if (!postId)
      return res.status(400).json({ message: "Post ID is required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.some(
      (like) => like.userId.toString() === userId.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (like) => like.userId.toString() !== userId.toString()
      );
    } else {
      post.likes.push({ userId });
    }

    await post.save();
    return res
      .status(200)
      .json({ message: "Like status updated", likes: post.likes.length });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Comment on a post
export const commentPost = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const userId = new mongoose.Types.ObjectId(decoded.id);

    const { postId, content } = req.body;
    if (!postId || !content) {
      return res
        .status(400)
        .json({ message: "Post ID and content are required" });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      userId,
      content,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    return res.status(200).json({
      message: "Comment added successfully",
      comments: post.comments.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Share a post
export const sharePost = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const userId = new mongoose.Types.ObjectId(decoded.id);

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { postId, caption } = req.body;
    if (!postId)
      return res.status(400).json({ message: "Post ID is required" });

    const originalPost = await Post.findById(postId);
    if (!originalPost)
      return res.status(404).json({ message: "Original post not found" });

    const sharedPost = new Post({
      userId,
      postType: originalPost.postType,
      content: caption || "",
      media: originalPost.media,
      tags: originalPost.tags,
      sharedPost: originalPost._id,
    });

    await sharedPost.save();
    originalPost.shares.push({ userId });
    await originalPost.save();
    user.posts.push(sharedPost._id);
    await user.save();

    return res
      .status(201)
      .json({ message: "Post shared successfully", sharedPost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "userId",
        select: "username profile",
        populate: {
          path: "profile",
          model: "Profile", // optional if schema ref is set correctly
          select: "profilePicture",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const userId = new mongoose.Types.ObjectId(decoded.id);

    const { postId } = req.body;
    if (!postId)
      return res.status(400).json({ message: "Post ID is required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own posts" });
    }

    await post.deleteOne();
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
