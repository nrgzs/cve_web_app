import { Sequelize, DataTypes } from "sequelize";

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the current file directory (required for ES6 modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the .env file from a custom directory
dotenv.config({ path: path.join(__dirname, "../.env") });

// Initialize Sequelize with PostgreSQL configuration
// const sequelize = new Sequelize({
//   dialect: "postgres", // Change dialect to "postgres"
//   host: "server", // Set the host of the PostgreSQL server
//   port: 5432, // Default port for PostgreSQL
//   username: process.env.PG_USER, // Set your PostgreSQL username
//   password: process.env.PG_PASSWORD, // Set your PostgreSQL password
//   database: process.env.PG_DATABASE, // Set your PostgreSQL database name
//   logging: false, // Disable SQL query logging
//   dialectOptions: {
//     // Additional options for PostgreSQL, like SSL, timeouts, etc.
//     timeout: 10000, // Optional, if you want to set a connection timeout
//   },
// });

let sequelize= new Sequelize({ 
    username: process.env.PG_USER, // Set your PostgreSQL username
  password: process.env.PG_PASSWORD, // Set your PostgreSQL password
  database: process.env.PG_DATABASE, //
    
      host:"postgres",
      dialect: "postgres",
      port: 5432, 
      pool: {
        max: 100,
        min: 0,
        idle: 200000,
        acquire: 1000000,
      },
    }
  );


// Sync the database
async function initializeDatabase() {
  await sequelize.sync({ alter: true }); // Use `alter: true` for auto-migration
  
  console.log("Database synchronized with PostgreSQL");
}

export {
  sequelize,
  initializeDatabase,
};
