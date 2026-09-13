import express from "express";
import authRoutes from "./routes/authRoutes.js";
import comparisonRoutes from "./routes/comparisonRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/comparison", comparisonRoutes);

app.get("/", (req, res) => {
  res.send("We activeeee");
});

export default app;
