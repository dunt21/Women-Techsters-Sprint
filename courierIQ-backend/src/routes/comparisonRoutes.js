import express from "express";
import { comparison, getHistory } from "../controllers/comparisonController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/compare", authenticateUser, comparison);
router.get("/history", authenticateUser, getHistory);

export default router;
