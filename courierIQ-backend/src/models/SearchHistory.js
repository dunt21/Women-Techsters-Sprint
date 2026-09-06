import { DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./User.js";

export const SearchHistory = sequelize.define("SearchHistory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  pickupLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
