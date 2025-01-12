// import axios from "axios";
// // import { initializeDatabase, initialSaveToDatabase } from "./dbConnect.js";
// // import { initialSaveToFile } from "./fileWriter.js";
// import { initializeDatabase, initialSaveToDatabase } from "./dbConnect.js";

// await initializeDatabase();


// export async function fetchInitialData(app) {
//     console.log(app);
    
//   try {
//     const { data } = await axios(
//       `https://cvedb.shodan.io/cves?cpe23=${app.cpe_name}`
//     );

//     await initialSaveToDatabase(app, 'https://cvedb.shodan.io', data.cves); // Save to database

//     return data;
//   } catch (error) {
//     console.error("Error fetching CVE details:", error);
//   }
// }

// //   https://cvedb.shodan.io/cves?cpe23=cpe:2.3:a:ibm:qradar_security_information_and_event_manager:7.2.6:*:*:*:*:*:*:*
