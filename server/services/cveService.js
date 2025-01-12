import axios from "axios";
import { saveCveToDatabase } from "../utils/saveCveToDb.js";

export const fetchCveData = async () => {
  try {
    // const response = await axios.get("https://example-cve-api.com/data"); // Replace with actual API URL
    return "fetch initial data";
  } catch (error) {
    console.error("Error fetching CVE data:", error.message);
    throw new Error("Failed to fetch CVE data");
  }
};

export const fetchInitialCveData = async (app) => {
  try {
    const { data } = await axios(
      `https://cvedb.shodan.io/cves?cpe23=${app?.cpe_name}`
    );

    if (data && data.cves) {
      // Save the fetched CVEs to the database
      await saveCveToDatabase(data.cves, app);

      return data;
    } else {
      throw new Error("No CVEs found for the provided CPE");
    }
  } catch (error) {
    console.error("Error fetching CVE data:", error.message);
  }
};
