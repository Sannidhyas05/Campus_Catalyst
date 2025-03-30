import User from "../models/users.models.js";
import Profile from "../models/profile.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { sapId, name, email, password, role, username } = req.body;

    // Check for required fields
    if (!sapId) {
      return res.status(400).json({
        message: "SAP ID is required.",
      });
    }
    if (!name) {
      return res.status(400).json({
        message: "Name is required.",
      });
    }
    if (!username) {
      return res.status(400).json({
        message: "Username is required.",
      });
    }

    if (!email) {
      return res.status(400).json({
        message: " Email is required.",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Password is required.",
      });
    }
    if (!role) {
      return res.status(400).json({
        message: "Role is required.",
      });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      if (existingUser.email === email) {
        return res
          .status(400)
          .json({ message: "User already exists with this email." });
      } else if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already taken." });
      }
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
    await newUser.save();

    const newProfile = await Profile.create({
      user: newUser._id, // Reference user ID
      username,
      bio: "",
      skills: [],
      socialLinks: {
        linkedin: "",
        github: "",
        website: "",
      },
      achievements: [],
      projects: [],
    });
    await newProfile.save();

    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        sapId: newUser.sapId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        username: newUser.username,
      },
      profile: {
        id: newProfile._id,
        username: newProfile.username,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Error registering user", error });
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

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        sapId: user.sapId,
        name: user.name,
        email: user.email,
        role: user.role,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Error logging in", error });
  }
};

// User Profile Pictue Upload

export const updateProfilePicture = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided." });
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET || "secret_key");
    const userId = decoded.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const filePath = req.file.path;

    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { profilePicture: filePath },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    return res.status(200).json({
      message: "Profile picture updated successfully!",
      profilePicture: profile.profilePicture,
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return res.status(500).json({ message: "Server error", error });
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

    const decoded = jwt.decode(token, process.env.JWT_SECRET || "secret_key");
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

    return res.status(200).json({
      message: "Username updated successfully!",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
      },
    });
  } catch (error) {
    console.error("Error updating username:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Get User Profile

export const getUserProfile = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.decode(token.replace("Bearer ", ""));
    if (!decoded || !decoded.id) {
      return res.status(400).json({ message: "Invalid token." });
    }

    const userId = decoded.id;

    const profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "sapId name email role username profilePicture"
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    const profileData = profile.toObject();
    profileData.profilePicture = profile.profilePicture || "hell";
    res.status(200).json(profileData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error retrieving profile", error });
  }
};

//Update Profile

export const updateProfileData = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET || "secret_key");
    if (!decoded || !decoded.id) {
      return res.status(400).json({ message: "Invalid token." });
    }

    const userId = decoded.id;
    const newProfileData = req.body;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    Object.assign(profile, newProfileData);
    await profile.save();

    return res
      .status(200)
      .json({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Error updating profile", error });
  }
};

//GET ALL USERS

export const getAllUsers = async (req, res) => {
  try {
    const profiles = await Profile.find().populate(
      "user",
      "sapId name email role username profilePicture "
    );
    return res.status(200).json(profiles);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users", error });
  }
};
