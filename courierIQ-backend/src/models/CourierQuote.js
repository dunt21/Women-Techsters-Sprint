import { DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../config/database.js";
import { SearchHistory } from "./SearchHistory.js";

export const CourierQuote = sequelize.define("CourierQuote", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  searchHistoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SearchHistory,
      key: "id",
    },
  },

  courier: {
    type: DataTypes.ENUM("Uber", "Yango", "Bolt"),
    allowNull: false,
  },

  price: { type: DataTypes.NUMBER, allowNull: false },
  estimatedTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  rating: { type: DataTypes.STRING, allowNull: false },

  estimatedTime: { type: DataTypes.STRING, allowNull: false },

  price: { type: DataTypes.STRING, allowNull: false },
  dropOffDate: { type: DataTypes.STRING, allowNull: false },
  dropOffTime: { type: DataTypes.STRING, allowNull: false },
});
