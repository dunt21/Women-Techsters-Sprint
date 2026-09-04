import express from "express";
import { connectDb } from "./src/config/database.js";

const app = express();

app.get("/", (req, res) => {
  res.send("We activeeee");
});

app.listen(5000, () => {
  console.log("We liveeeee");
  connectDb();
});
