import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully to Neon PostgreSQL");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}
