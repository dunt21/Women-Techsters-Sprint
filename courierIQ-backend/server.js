import { connectDb } from "./src/config/database.js";
import { sequelize } from "./src/models/index.js";

import app from "./src/app.js";

app.listen(5000, async () => {
  console.log("We liveeeee");
  await connectDb();

  await sequelize.sync({ alter: true });
  console.log("All Database tables synced perfectly!");
});
