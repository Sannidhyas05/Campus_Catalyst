import express from "express";
import { activeCheck } from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/", activeCheck);

export default router;
