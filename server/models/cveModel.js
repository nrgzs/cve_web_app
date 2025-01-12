import { DataTypes } from "sequelize";
import {sequelize} from "../db/dbConnect.js";

const CVE = sequelize.define('CVE', {
  
    appProduct: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpe_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vendor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cve: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  });
export default CVE;
