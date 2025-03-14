import User from "../models/users.models.js";
import jwt from "jsonwebtoken";

// Follow a user
export const followUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const { followId } = req.body; // User to be followed

    if (!followId) {
      return res.status(400).json({ message: "FollowId is required" });
    }

    const userId = decoded.id;
    if (userId === followId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const userToFollow = await User.findById(followId);
    const currentUser = await User.findById(userId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.following.includes(followId)) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }

    currentUser.following.push(followId);
    userToFollow.followers.push(userId);

    await currentUser.save();
    await userToFollow.save();

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

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const { unfollowId } = req.body;

    if (!unfollowId) {
      return res.status(400).json({ message: "UnfollowId is required" });
    }

    const currentUser = await User.findById(userId);
    const userToUnfollow = await User.findById(unfollowId);

    if (!currentUser || !userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!currentUser.following.includes(unfollowId)) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }

    // Remove from following & followers lists
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== unfollowId
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== userId
    );

    await currentUser.save();
    await userToUnfollow.save();

    return res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get followers and following list
export const getfollowData = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate("followers", "username profilePicture")
      .populate("following", "username profilePicture");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      followers: user.followers,
      following: user.following,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
