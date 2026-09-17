import express from "express";
import authRoutes from "./routes/authRoutes.js";
import comparisonRoutes from "./routes/comparisonRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/comparison", comparisonRoutes);
app.use("/orderDelivery", deliveryRoutes);

app.get("/", (req, res) => {
  res.send("We activeeee");
});

app.use(errorHandler);

export default app;
