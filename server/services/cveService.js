import axios from "axios";
import { saveCveToDatabase } from "../utils/saveCveToDb.js";
import { Application } from "../models/applicationModel.js";
import dynamicCrawl from "../utils/dynamicCrawl.js";
import staticCrawl from "../utils/staticCrawl.js";
import Path from "../models/pathModel.js";
import handlePathUrl from "../utils/handlePathUrl.js";
import { getApplications } from "./appService.js";
import { cronHelper } from "../cron/cronHelper.js";
import CVE from "../models/cveModel.js";

export const fetchCveData = async () => {
  try {
   const data = CVE.findAll()
    return  data;
  } catch (error) {
    console.error("Error fetching CVE data:", error.message);
    throw new Error("Failed to fetch CVE data");
  }
};

export const fetchInitialCveData = async (appId, onAlert = false) => {
  try {
    // Fetch application details from the database using the appId
    const app = await Application.findOne({ where: { id: appId } });

    if (!app) {
      throw new Error(`Application with id ${appId} not found`);
    }

    console.log(`Fetching CVE data for application: ${app.product}`);

    // Fetch CVE data from the external API
    const { data } = await axios.get(
      `https://cvedb.shodan.io/cves?cpe23=${app?.cpe_name}`
    );

    const cveUrl = `https://cvedb.shodan.io/cpe/${app?.cpe_name}`;

    if (data && data.cves) {
      // Save the fetched CVEs to the database
      await saveCveToDatabase(data.cves, cveUrl, app, onAlert);

      console.log(`CVE data saved for application: ${app.product}`);
      return data;
    } else {
      throw new Error("No CVEs found for the provided CPE");
    }
  } catch (error) {
    console.error("Error fetching CVE data:", error.message);
    throw new Error("Failed to fetch CVE data");
  }
};

export const fetchDynamicCveData = async (appId) => {
  const regex = /CVE-\d{4}-\d{4,7}/gi;

  try {
    // Fetch application details from the database using the appId
    const app = await Application.findOne({ where: { id: appId } });

    if (!app) {
      throw new Error(`Application with id ${appId} not found`);
    }

    console.log(`Fetching CVE data for application: ${app.product}`);

    const paths = await Path.findAll();

    for (let path of paths) {
      const pathUrl = handlePathUrl(path, app);

      // Fetch CVE data from the external API
      staticCrawl(app, pathUrl, regex, false); //app, url, regex=/CVE-\
      dynamicCrawl(app, pathUrl, regex, false);
    }

    if (app.additionalLinks.length) {
      for (let path of app.additionalLinks) {
        const pathUrl = handlePathUrl(path, app);

        // Fetch CVE data from the external API
        staticCrawl(app, pathUrl, regex, false); //app, url, regex=/CVE-\
        dynamicCrawl(app, pathUrl, regex, false);
      }
    }
  } catch (error) {
    console.error("Error fetching CVE data:", error.message);
    throw new Error("Failed to fetch CVE data");
  }
};

export async function fetchveDataForAllApps() {
  const regex = /CVE-\d{4}-\d{4,7}/gi;

  try {
    const allApps = await getApplications();
    const paths = await Path.findAll();

    for (let app of allApps) {
      console.log(`Processing app ${app.id} with ${paths.length} paths...`);

      await Promise.all(
        paths.map(async (path) => {
          const pathUrl = handlePathUrl(path, app);
          let setAlert = path.flagSearch && app.flagSearch ? true : false;

          try {
            console.log(`Processing path ${pathUrl} for app ${app.id}`);
            await fetchInitialCveData(app.id, setAlert);
            await staticCrawl(app, pathUrl, regex, setAlert);
            await dynamicCrawl(app, pathUrl, regex, setAlert);
          } catch (error) {
            console.error(`Error processing path ${pathUrl} for app ${app.id}:`, error);
          }
        })
      );

      if (app.additionalLinks.length) {
        await Promise.all(
          app.additionalLinks.map(async (path) => {
            const pathUrl = handlePathUrl(path, app);
            let setAlert = path.flagSearch ? true : false;

            try {
              await staticCrawl(app, pathUrl, regex, setAlert);
              await dynamicCrawl(app, pathUrl, regex, setAlert);
              path.flagSearch += 1;
              await path.save();
            } catch (error) {
              console.error(`Error processing additional path ${pathUrl}:`, error);
            }
          })
        );
      }

      app.flagSearch += 1;
      await app.save();
    }

    await Promise.all(
      paths.map(async (p) => {
        p.flagSearch += 1;
        await p.save();
      })
    );

    console.log("CVE data fetching completed.");
  } catch (error) {
    console.error("Error in fetchveDataForAllApps:", error);
  }
}



export async function initializeFetchService() {
  cronHelper(fetchveDataForAllApps);
}
