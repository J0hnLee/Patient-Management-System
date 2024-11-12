import React from "react";
import puppeteer from "puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js";

const Scraping = async () => {
  const wsUrl =
    "ws://localhost:9222/devtools/browser/090fbafa-8731-403a-a0bf-46418ab28cf8";
  console.log("🚀 ~ Scraping ~ wsUrl:", wsUrl);

  const browser = await puppeteer.connect({
    browserWSEndpoint: wsUrl,
  });

  const context = await browser.createBrowserContext();

  const page1 = await context.newPage("https://www.google.com");
  await page1.goto("https://www.google.com");
  //await page1.screenshot({ path: "google.png" });
  const page2 = await context.newPage();
  console.log(browser);
  console.log("Browser has " + (await browser.pages()).length + " pages");

  browser.disconnect();
  return <div>Scraping</div>;
};

export default Scraping;
