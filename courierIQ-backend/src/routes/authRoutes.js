import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateBody } from "../middleware/validation.js";
import { loginSchema, registerSchema } from "../schema/authValidator.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), registerUser);
router.post("/login", validateBody(loginSchema), loginUser);

export default router;
