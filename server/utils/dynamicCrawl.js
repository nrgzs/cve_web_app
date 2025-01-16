import puppeteer from 'puppeteer';
import { saveCveToDatabase } from "./saveCveToDb.js";

async function dynamicCrawl(app, url, regex=/CVE-\d{4}-\d{4,7}/gi, onAlert) {
    console.log('dynamic url  ' + url);
    console.log(onAlert);
    
  
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.waitForSelector('body');
      const pageContent = await page.content();
      const cveMatchesDemo = pageContent.match(regex) || [];
      const uniqueCve = new Set([...cveMatchesDemo]);
      const cveMatches = Array.from(uniqueCve);
    
  
      if (cveMatches.length) {
        console.log(
          `Found CVE identifiers on ${url}: ${app.product}`,
          cveMatches
        );
        await saveCveToDatabase(cveMatches,url, app,onAlert); // Save to database
      } else {
        console.log(`No CVE identifiers found. ${url}`);
      }
  
      await browser.close();
    } catch (error) {
      console.error(`Error in dynamic crawl for ${url}:`, error.message);
    }
  }
  
  export default dynamicCrawl