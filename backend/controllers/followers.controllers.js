import User from "../models/users.models.js";
import Profile from "../models/profile.models.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Follow a user

export const followUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const userId = new mongoose.Types.ObjectId(decoded.id);
    const { followId } = req.body;

    if (!followId) {
      return res.status(400).json({ message: "FollowId is required" });
    }

    const Profile_to_follow = new mongoose.Types.ObjectId(followId);

    if (userId.equals(Profile_to_follow)) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const currentUser = await Profile.findOne({ user: userId });
    const followUser = await Profile.findOne({ user: Profile_to_follow });

    if (!currentUser) {
      return res
        .status(404)
        .json({ message: "Current user profile not found" });
    }

    if (!followUser) {
      return res
        .status(404)
        .json({ message: "User to follow profile not found" });
    }

    if (currentUser.following.includes(Profile_to_follow)) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }

    currentUser.following.push(Profile_to_follow);
    followUser.followers.push(userId);

    await currentUser.save();
    await followUser.save();

    return res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Unfollow a user

export const unfollowUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const userId = new mongoose.Types.ObjectId(decoded.id);
    const { unfollowId } = req.body;

    if (!unfollowId) {
      return res.status(400).json({ message: "UnfollowId is required" });
    }

    const unfollowProfileId = new mongoose.Types.ObjectId(unfollowId);

    const currentUserProfile = await Profile.findOne({ user: userId });
    const unfollowUserProfile = await Profile.findOne({
      user: unfollowProfileId,
    });

    if (!currentUserProfile) {
      return res
        .status(404)
        .json({ message: "Current user profile not found" });
    }

    if (!unfollowUserProfile) {
      return res
        .status(404)
        .json({ message: "User to unfollow profile not found" });
    }

    if (!currentUserProfile.following.includes(unfollowProfileId)) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }

    currentUserProfile.following = currentUserProfile.following.filter(
      (id) => id.toString() !== unfollowProfileId.toString()
    );
    unfollowUserProfile.followers = unfollowUserProfile.followers.filter(
      (id) => id.toString() !== userId.toString()
    );

    await currentUserProfile.save();
    await unfollowUserProfile.save();

    return res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get followers and following list

export const getfollowData = async (req, res) => {
  try {
    const { userId } = req.params;

    const userProfile = await Profile.findOne({ user: userId })
      .populate("followers", "username profilePic")
      .populate("following", "username profilePic");

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    return res.status(200).json({
      followers: userProfile.followers,
      following: userProfile.following,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
