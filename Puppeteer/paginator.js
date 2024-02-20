const { log } = require("console");
const fs = require("fs");
const puppeteer = require("puppeteer");

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  await page.goto(
    "https://www.amazon.com/s?i=computers-intl-ship&bbn=16225007011&rh=n%3A16225007011%2Cn%3A11036071%2Cp_36%3A1253503011&dc&fs=true&qid=1635596580&rnid=16225007011&ref=sr_pg_1"
  );

  let isBtnDisabled = false;
  while (!isBtnDisabled) {
    await page.waitForSelector('[data-cel-widget="search_result_0"]');
    const productsHandles = await page.$$(
      "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
    );

    items = [];
    for (const producthandle of productsHandles) {
      let title = "Null";
      let price = "Null";
      let img = "Null";
      let url = "Null";

      try {
        title = await page.evaluate(
          (el) => el.querySelector("h2 > a > span").textContent,
          producthandle
        );
      } catch (error) {}
      // console.log('title: ', title);
      try {
        price = await page.evaluate(
          (el) => el.querySelector(".a-price > .a-offscreen").textContent,
          producthandle
        );
        price = price.replace('US$', '');
      } catch (error) {}
      // console.log('price: ', price);
      try {
        img = await page.evaluate(
          (el) => el.querySelector(".s-image").getAttribute("src"),
          producthandle
        );
      } catch (error) {}
      try{
        url = await page.evaluate(
          (el) => el.querySelector('a.a-link-normal').href,
          producthandle
        );
      }catch (error) {}
      if (title !== "Null") {
        items.push(title);
        items.push(price);
        items.push(img);
        items.push(url);
        fs.appendFile(
          "results.csv",
          `${title.replace(/,/g, ".")},${price},${img},${url}\n`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    }

    console.log(items);
    console.log(items.length);
    await page.waitForSelector(".s-pagination-next", { visible: true });
    const is_disabled = (await page.$(".s-pagination-next.s-pagination-disabled")) !== null;

    await new Promise((resolve) => setTimeout(resolve, 1600));
    isBtnDisabled = is_disabled;
    if (!is_disabled) {
      await Promise.all([
        page.click(".s-pagination-next"),
        page.waitForNavigation({ waitUntil: "networkidle2" }),
      ]);
    }
  }

  await browser.close();
})();