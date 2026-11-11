import express from "express";
import { testStorageConnection, uploadFile, listFiles } from "../services/storageService.js";

const router = express.Router();

router.get("/health", async (req, res, next) => {
  try {
    const result = await testStorageConnection();
    res.json({ message: "Object storage is healthy", ...result });
  } catch (error) {
    next(error);
  }
});

router.get("/files", async (req, res, next) => {
  try {
    const files = await listFiles();
    res.json({ files: files.Contents || [] });
  } catch (error) {
    next(error);
  }
});

export default router;

