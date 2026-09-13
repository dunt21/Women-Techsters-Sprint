import express from "express";
import { comparison } from "../controllers/comparisonController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/comparison", authenticateUser, comparison);

export default router;
