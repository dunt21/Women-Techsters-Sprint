import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import bcrypt from "bcryptjs";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  createdAt: {
    type: DataTypes.DATE,
  },

  updatedAt: {
    type: DataTypes.DATE,
  },

  status: {
    type: DataTypes.ENUM("active", "pending", "blocked"),
    defaultValue: "active",
  },
});

User.beforeCreate(async (user) => {
  const scrambledPassword = await bcrypt.hash(user.password, 10);

  user.password = scrambledPassword;
});

User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    const scrambledPassword = await bcrypt.hash(user.password, 10);

    user.password = scrambledPassword;
  }
});
