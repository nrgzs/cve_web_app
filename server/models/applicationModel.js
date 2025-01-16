import { DataTypes } from "sequelize";
import {sequelize} from "../db/dbConnect.js"; // Import your Sequelize instance

const Application = sequelize.define("Application", {
  vendor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  version: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpe_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Prevent duplicate entries for the same cpe_name
  },
});

// Additional Links Model
const AdditionalLink = sequelize.define('AdditionalLink', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parameters: {
    type: DataTypes.JSON, // Store parameters as JSON
    allowNull: true,
  },
  flagSearch: {
    type: DataTypes.INTEGER, 
    allowNull: true,
  },
});

// Defining associations
Application.hasMany(AdditionalLink, { foreignKey: 'applicationId',as: "additionalLinks", onDelete: 'CASCADE' });
AdditionalLink.belongsTo(Application, { foreignKey: 'applicationId' });

export { Application, AdditionalLink };

