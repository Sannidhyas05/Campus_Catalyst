import express from "express";
import { registerUser } from "../controllers/users.controllers.js";

const router = express.Router();

// ✅ Register User Route
router.route("/register").post(registerUser);

export default router;
