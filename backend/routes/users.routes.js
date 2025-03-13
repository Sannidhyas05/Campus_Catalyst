import express from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateProfilePic,
  updateUsername,
  updateProfileData,
} from "../controllers/users.controllers.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/upload", upload.single("profile_picture"), updateProfilePic);

router.put("/updateUsername", updateUsername);

router.get("/profile", getUserProfile);
router.post("/updateProfileData", updateProfileData);

export default router;
