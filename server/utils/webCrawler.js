// import paths from '../data/defaultPaths.json' assert { type: 'json' };
// import apps from '../data/app_list.json' assert { type: 'json' };
// import axios from 'axios';
// import * as cheerio from 'cheerio';
// import puppeteer from 'puppeteer';
// // import {  saveToFileAction } from "./fileWriter.js";
// import { initializeDatabase, saveToDatabase } from './dbConnect.js';

// // Initialize the database
// await initializeDatabase();

// export async function getData() {
//   try {
//     for (let path of paths) {
//       for (let app of apps) {
//         let vendorParam = path.parameters.vendor
//           ? `${path.parameters?.vendor}=${app.vendor}&`
//           : '';
//         let productParam = path.parameters.product
//           ? `${path.parameters?.product}=${app.product}&`
//           : '';
//         let versionParam = path.parameters.version
//           ? `${path.parameters?.version}=${app.version}&`
//           : '';

//         let parameters = vendorParam + productParam + versionParam;
//         let pathurl = `${path.url}${parameters}`;
//         console.log(pathurl);

//         const CVE_REGEX = /CVE-\d{4}-\d{4,7}/gi;

//         await staticCrawl(app, pathurl, CVE_REGEX);
//         await dynamicCrawl(app, pathurl, CVE_REGEX);

//         if (app.additional_links?.length) {
//           console.log('additional links');
//           additionalGetData(app, CVE_REGEX);
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Error fetching CVE details:', error);
//   }
// }

// async function staticCrawl(app, url, regex) {
//   try {
//     const response = await axios.get(url);
//     const $ = cheerio.load(response.data);
//     const pageText = $('body').text();
//     const cveMatchesDemo = pageText.match(regex) || [];
//     const uniqueCve = new Set([...cveMatchesDemo]);
//     const cveMatches = Array.from(uniqueCve);

//     if (cveMatches.length) {
//       console.log(`Found CVE identifiers: ${url} ${app.product}`, cveMatches);

//       await saveToDatabase(app, url, cveMatches); // Save to database
//     } else {
//       console.log(`No CVE identifiers found. ${url}`);
//     }
//   } catch (error) {
//     console.error(`Error in static crawl for ${url}:`, error.message);
//   }
// }

// async function dynamicCrawl(app, url, regex) {
//   console.log('dynamic url  ' + url);

//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: 'networkidle2' });
//     await page.waitForSelector('body');
//     const pageContent = await page.content();
//     const cveMatchesDemo = pageContent.match(regex) || [];
//     const uniqueCve = new Set([...cveMatchesDemo]);
//     const cveMatches = Array.from(uniqueCve);

//     if (cveMatches.length) {
//       console.log(
//         `Found CVE identifiers on ${url}: ${app.product}`,
//         cveMatches
//       );
//       await saveToDatabase(app, url, cveMatches); // Save to database
//     } else {
//       console.log(`No CVE identifiers found. ${url}`);
//     }

//     await browser.close();
//   } catch (error) {
//     console.error(`Error in dynamic crawl for ${url}:`, error.message);
//   }
// }

// function additionalGetData(app,regex) {
//   app.additional_links.map(async (link) => {
//     let vendorParam = link.parameters.vendor
//       ? `${link.parameters?.vendor}=${app.vendor}&`
//       : '';
//     let productParam = link.parameters.product
//       ? `${link.parameters?.product}=${app.product}&`
//       : '';
//     let versionParam = link.parameters.version
//       ? `${link.parameters?.version}=${app.version}&`
//       : '';

//     let parameters = vendorParam + productParam + versionParam;
//     let pathurl = `${link.url}${parameters}`;
//     console.log(pathurl);

//     await staticCrawl(app, pathurl, regex);
//     await dynamicCrawl(app, pathurl, regex);
//   });
// }
