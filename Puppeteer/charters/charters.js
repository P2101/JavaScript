const puppeteer = require("puppeteer");
const axios = require("axios");

(async () => {
  const boatObjects = await scrapeBoatData();
  await makeHttpRequests(boatObjects);
})();

async function scrapeBoatData() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();

  const url = "https://charterenmenorca.com/alquiler-barcos-menorca/";
  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

  await page.waitForSelector(".type-barco_alquiler");
  const boats = await page.$$(".type-barco_alquiler");

  const boatObjects = [];
  for (const boat of boats) {
    try {
      const boatObject = {};

      boatObject.title = await page.evaluate(
        (el) => el.querySelector(".elementor-heading-title > a").textContent,
        boat
      );

      const boatInfoElements = await boat.$$(".elementor-icon-list-text");
      boatObject.info = [];
      for (const infoElement of boatInfoElements) {
        const info = await page.evaluate(
          (el) => el.textContent.trim(),
          infoElement
        );
        boatObject.info.push(info);
      }

      boatObject.url = await page.evaluate(
        (el) => el.querySelector(".elementor-heading-title > a").href,
        boat
      );

      boatObjects.push(boatObject);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  await browser.close();
  return boatObjects;
}

async function makeHttpRequests(boatObjects) {
  const ids = [];
  for (const boatObject of boatObjects) {
    try {
      const response = await axios.get(boatObject.url);
      //   const api = /mybooking_api_key":"(.*?)"/i;
      const id = /data-code="(\d+)"/i;
      const match = response.data.match(id);
      if (match[1]) {
        ids.push(match[1]);
      }
      //   console.log(match[1]);

      //   console.log("Response Data for", boatObject.title, ":", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  //   console.log(ids);
  getPrice(ids);
}

async function getPrice(ids) {
  for (const id of ids) {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    try {
      //   const url = `https://charterenmenorca.mybooking.es/api/booking/frontend/products/23/occupation?from=2024-02-01&to=2024-03-01&api_key=5YTw3PxevdHAJXBk1FlND84uyEr9obVaCWhUKOnLMGcQqZIp&duration_scope=in_one_day&firstday=true`;
      const url = `https://charterenmenorca.mybooking.es/api/booking/frontend/products/${id}/occupation?from=2024-02-01&to=2024-03-01&api_key=5YTw3PxevdHAJXBk1FlND84uyEr9obVaCWhUKOnLMGcQqZIp&duration_scope=in_one_day&firstday=true`;
      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: "./tmp",
      });
      const page = await browser.newPage();

      await new Promise((resolve) => setTimeout(resolve, 2000));
      await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await page.waitForSelector("pre");
      const json = await page.evaluate(() => {
        const preElement = document.querySelector("pre");
        if (preElement) {
          return preElement.textContent;
        }
        return null;
      });

      const data = JSON.parse(json);
      console.log(data.prices);
      //   const html = await page.content();
      //   const json = await page.evaluate(
      //     (el) => el.querySelector('pre'), html
      //   );
      //   console.log(json);
        await browser.close();
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  await browser.close();
}
