import express from "express";
import {
  deliveryController,
  getHistory,
} from "../controllers/deliveryController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/delivery", authenticateUser, deliveryController);
router.get("/history", authenticateUser, getHistory);

export default router;
