import axios from "axios";
import * as cheerio from 'cheerio';
import { saveCveToDatabase } from "./saveCveToDb.js";

async function staticCrawl(app, url, regex, onAlert=false) {
  
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const pageText = $('body').text();
      const cveMatchesDemo = pageText.match(regex) || [];
      const uniqueCve = new Set([...cveMatchesDemo]);
      const cveMatches = Array.from(uniqueCve);
  
      if (cveMatches.length) {
        console.log(`Found CVE identifiers: ${url} ${app.product}`, cveMatches);

        await saveCveToDatabase(cveMatches,url, app,onAlert);
      } else {
        console.log(`No CVE identifiers found. ${url}`);
      }
    } catch (error) {
      console.error(`Error in static crawl for ${url}:`, error.message);
    }
  }

  export default staticCrawl
  