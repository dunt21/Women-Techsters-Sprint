import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./User.js";

export const PreferredDelivery = sequelize.define("PreferredDelivery", {
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

  dropoffLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selectedCourier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estimatedTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  trackingUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // status: {
  //   type: DataTypes.ENUM("Pending", "In Transit", "Delivered", "Cancelled"),
  //   defaultValue: "Pending",
  // },
});
