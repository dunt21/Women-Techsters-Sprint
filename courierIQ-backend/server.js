import express from "express";
import { connectDb } from "./src/config/database.js";
import { sequelize } from "./src/models/index.js";

const app = express();

app.get("/", (req, res) => {
  res.send("We activeeee");
});

app.listen(5000, async () => {
  console.log("We liveeeee");
  await connectDb();

  await sequelize.sync({ alter: true });
  console.log("All Database tables synced perfectly!");
});
