import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const Status = sequelize.define("Status", {
  fetchStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
 
});

export default Status;
