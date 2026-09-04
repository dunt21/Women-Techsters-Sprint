import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

export async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log("success");
  } catch (err) {
    console.error(err);
  }
}
