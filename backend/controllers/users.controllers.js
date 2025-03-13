import User from "../models/users.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { sapId, name, email, password, role, username } = req.body;

    // Check for required fields
    if (!sapId || !name || !email || !password || !role || !username) {
      return res.status(400).json({
        message:
          "All fields (sapId, name, email, password, role) are required.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      sapId,
      name,
      email,
      password,
      role, // Student, Teacher, Admin
      username,
    });

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        sapId: newUser.sapId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

/* LOGIN  */

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      {
        id: user._id,
        sapId: user.sapId,
        role: user.role,
      },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        sapId: user.sapId,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

// User Profile Pictue Upload

export const updateProfilePic = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    const userId = decoded.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const filePath = req.file.path; // Get uploaded file path

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: filePath }, // Update profile picture in database
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Profile picture updated successfully!",
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

//Username Update

export const updateUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    const userId = decoded.id;

    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    // Check if username is already taken (excluding the current user)
    const existingUser = await User.findOne({ username });

    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ message: "Username already taken." });
    }

    // Update username in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Username updated successfully!",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
      },
    });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
