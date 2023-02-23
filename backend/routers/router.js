import express from "express";
import { register } from "../controllers/authController.js"
import { test } from "../controllers/test.js";

const router = express.Router();

router.post("/", register)
router.get("/users", test)

export default router;