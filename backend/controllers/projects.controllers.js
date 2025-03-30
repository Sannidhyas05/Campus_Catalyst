import Project from "../models/projects.models.js";
import User from "../models/users.models.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Create a project
export const createProject = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const userId = new mongoose.Types.ObjectId(decoded.id);

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { title, description, teamMembers, mentorId, tags } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description required" });
    }

    const media = req.files
      ? req.files.map((file) => ({
          url: file.path,
          type: file.mimetype.split("/")[0],
        }))
      : [];

    const project = new Project({
      userId,
      title,
      description,
      teamMembers,
      mentorId,
      media,
      tags: tags || [],
    });

    await project.save();
    return res
      .status(201)
      .json({ message: "Project created successfully", project });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("userId", "name email profilePicture")
      .populate("teamMembers", "name email profilePicture")
      .populate("mentorId", "name email profilePicture")
      .sort({ createdAt: -1 });
    return res.status(200).json({ projects });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
