import express from "express";
import { comparison, getHistory } from "../controllers/comparisonController.js";
import { authenticateUser } from "../middleware/auth.js";
import { CompareSchema } from "../schema/compareValidator.js";
import { validateBody } from "../middleware/validation.js";

const router = express.Router();

router.post(
  "/compare",
  validateBody(CompareSchema),
  authenticateUser,
  comparison,
);
router.get("/history", authenticateUser, getHistory);

export default router;
