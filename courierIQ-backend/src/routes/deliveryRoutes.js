import express from "express";
import {
  deliveryController,
  getHistory,
} from "../controllers/deliveryController.js";
import { authenticateUser } from "../middleware/auth.js";
import { validateBody } from "../middleware/validation.js";
import { deliverySchema } from "../schema/deliverySchema.js";

const router = express.Router();

router.post(
  "/delivery",
  validateBody(deliverySchema),
  authenticateUser,
  deliveryController,
);
router.get("/history", authenticateUser, getHistory);

export default router;
