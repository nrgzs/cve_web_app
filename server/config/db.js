// import { Sequelize, DataTypes } from 'sequelize';

// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { sendAlert } from './alertBot.js';

// // Get the current file directory (required for ES6 modules)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load the .env file from a custom directory
// dotenv.config({ path: path.join(__dirname, '../.env') });

// // Initialize Sequelize with PostgreSQL configuration
// const sequelize = new Sequelize({
//   dialect: 'postgres', // Change dialect to "postgres"
//   host: 'localhost', // Set the host of the PostgreSQL server
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

// // Define the CVE model
// const CVE = sequelize.define('CVE', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   appProduct: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   cpe_name: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     unique: false,
//   },
//   vendor: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   version: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   url: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   cve: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   timestamp: {
//     type: DataTypes.DATE,
//     defaultValue: Sequelize.NOW,
//   },
// });

// // Sync the database
// async function initializeDatabase() {
//   await sequelize.sync({ alter: true }); // Use `alter: true` for auto-migration
//   console.log('Database synchronized with PostgreSQL');
// }

// // Save CVEs to the database using Sequelize ORM
// async function saveToDatabase(app, url, cves) {
//   for (let cve of cves) {
//     let success = false;
//     let attempts = 0;
//     const maxAttempts = 5;

//     while (!success && attempts < maxAttempts) {
//       try {
//         // Check if the CVE already exists in the database
//         const existingCve = await CVE.findOne({
//           where: {
//             cve,
//             appProduct: app.product,
//             cpe_name: app.cpe_name,
//             vendor: app.vendor,
//             version: app.version,
//             url,
//           },
//         });

//         if (existingCve) {
//           console.log(`CVE ${cve} already exists for ${app.product}.`);
//         } else {
//           // If CVE doesn't exist, create it
//           await CVE.create({
//             cve,
//             appProduct: app.product,
//             cpe_name: app.cpe_name,
//             vendor: app.vendor,
//             version: app.version,
//             url,
//           });
//           sendAlert(cve, app.product);
//           console.log(`Saved CVE ${cve} for ${app.product} in the database.`);
//         }

//         success = true;
//       } catch (error) {
//         console.error('Error saving to database:', error.message);
//         attempts++;
//         if (attempts < maxAttempts) {
//           console.warn(`Retrying... (Attempt ${attempts}/${maxAttempts})`);
//           await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
//         }
//       }
//     }

//     if (!success) {
//       console.error(
//         `Failed to process CVE ${cve} for ${app.product} after ${maxAttempts} attempts.`
//       );
//     }
//   }
// }


// // Initialize and save initial data to PostgreSQL
// async function initialSaveToDatabase(app, url, cves) {
//   for (let cve of cves) {
//     let success = false;
//     let attempts = 0;
//     const maxAttempts = 5;
//     while (!success && attempts < maxAttempts) {
//       try {
//         await CVE.findOrCreate({
//           where: {
//             cve: cve.cve_id,
//             cpe_name: app.cpe_name,
//             appProduct: app.product,
//             vendor: app.vendor,
//             version: app.version,
//             url,
//           },
//           defaults: {
//             cve: cve.cve_id,
//             cpe_name: app.cpe_name,
//             appProduct: app.product,
//             vendor: app.vendor,
//             version: app.version,
//             url,
//           },
//         });
//         console.log(
//           `Saved CVE ${cve.cve_id} for ${app.product} in the database.`
//         );
//         success = true;
//       } catch (error) {
//         console.error('Error saving to database:', error.message);
//         throw error;
//       }
//     }
//     if (!success) {
//       console.error(
//         `Failed to save CVE ${cve.cve_id} for ${app.product} after ${maxAttempts} attempts.`
//       );
//     }
//   }
// }

// export {
//   sequelize,
//   CVE,
//   initializeDatabase,
//   saveToDatabase,
//   initialSaveToDatabase,
// };