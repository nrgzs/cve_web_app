import CVE from "../models/cveModel.js";
import { sendAlert } from "./alertBot.js";

// Function to save CVEs to the database
export const saveCveToDatabase = async (cveData,url, app, onAlert) => {
    console.log(onAlert);
    try {
        for (const cve of cveData) {
          const validCve =cve.cve_id||cve

          // Check if the CVE already exists in the database
          const existingCve = await CVE.findOne({
            where: {
              cve: validCve,  // Ensure the CVE ID is unique
            },
          });
    
          if (existingCve) {
            // If the CVE already exists, skip it
            console.log(`CVE ${validCve} already exists for ${app.product}`);
          } else {
            // Save the new CVE if it doesn't exist
            await CVE.create({
              appProduct: app.product,
              cpe_name: app.cpe_name,
              vendor: app.vendor,
              version: app.version,
              url: url,  // Use a default URL or set it dynamically
              cve:validCve,  // Unique CVE ID
            });

            console.log(`Saved CVE ${validCve} for ${app.product}`);

            console.log(`ALERT!!!!!!!`);
            sendAlert(validCve,app.product)


          }
        }
      } catch (error) {
        console.error("Error saving CVEs to the database:", error.message);
        throw new Error("Failed to save CVEs");
      }
};
