import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const Path = sequelize.define("Path", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parameters: {
    type: DataTypes.JSON, // Store the "parameters" object as JSON
    allowNull: true, // Allow null for flexibility
  },
  flagSearch:{// indicates how many time path was searched
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

export default Path;
