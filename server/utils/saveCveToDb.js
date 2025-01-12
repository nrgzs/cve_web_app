import CVE from "../models/cveModel.js";

// Function to save CVEs to the database
export const saveCveToDatabase = async (cveData, app) => {
    console.log(cveData);
    
    try {
        for (const cve of cveData) {
          // Check if the CVE already exists in the database
          const existingCve = await CVE.findOne({
            where: {
              cve: cve.cve_id,  // Ensure the CVE ID is unique
            },
          });
    
          if (existingCve) {
            // If the CVE already exists, skip it
            console.log(`CVE ${cve.cve_id} already exists for ${app.product}`);
          } else {
            // Save the new CVE if it doesn't exist
            await CVE.create({
              appProduct: app.product,
              cpe_name: app.cpe_name,
              vendor: app.vendor,
              version: app.version,
              url: "shodan",  // Use a default URL or set it dynamically
              cve: cve.cve_id,  // Unique CVE ID
            });
            console.log(`Saved CVE ${cve.cve_id} for ${app.product}`);
          }
        }
      } catch (error) {
        console.error("Error saving CVEs to the database:", error.message);
        throw new Error("Failed to save CVEs");
      }
};
