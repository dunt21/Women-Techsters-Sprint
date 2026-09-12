import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("We activeeee");
});

export default app;
