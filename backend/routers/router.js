import express from "express";
import { register } from "../controllers/authController.js"

const router = express.Router();

router.get("/", register)

export default router;