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
    validate: {
      len: {
        args: [3, 100],
        msg: "Please provide a valid full name.",
      },
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 100],
        msg: "Your password must be at least 8 characters long!",
      },
    },
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
