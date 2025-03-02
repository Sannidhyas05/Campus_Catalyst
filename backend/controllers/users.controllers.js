import User from "../models/users.models.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { sapId, name, email, password, role } = req.body;

    // Check for required fields
    if (!sapId || !name || !email || !password || !role) {
      return res
        .status(400)
        .json({
          message:
            "All fields (sapId, name, email, password, role) are required.",
        });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      sapId,
      name,
      email,
      password: hashedPassword,
      role, // Student, Teacher, Admin
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
