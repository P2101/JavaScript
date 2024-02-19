const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();

  const url = "https://charterenmenorca.com/alquiler-barcos-menorca/";
  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

  // const titles = await page.evaluate(() => {
  //     const titlesArray = [];
  //     const titlesElements = document.querySelectorAll('.elementor-heading-title > a');
  //     titlesElements.forEach(titleElement => {
  //         titlesArray.push(titleElement.innerText);
  //     });
  //     return titlesArray;
  // });

  // const info = await page.evaluate(() => {
  //     const eslora = document.querySelectorAll('.elementor-icon-list-text');
  // });

  await page.waitForSelector(".type-barco_alquiler");
  const boats = await page.$$(".type-barco_alquiler");

  for (const boat of boats) {
    try {
      const title = await page.evaluate(
        (el) => el.querySelector(".elementor-heading-title > a").textContent,
        boat
      );
      console.log("Title:", title);

      const boatInfoElements = await boat.$$(".elementor-icon-list-text");
      for (const infoElement of boatInfoElements) {
        const info = await page.evaluate(
          (el) => el.textContent.trim(),
          infoElement
        );
        console.log("Info:", info);
      };
      const url = await page.evaluate(
        (el) => el.querySelector('.elementor-heading-title > a').href,
        boat
      );
      console.log("Url:", url);


// fer sa url i passar-ho com a object

    } catch (error) {
      console.error("Error:", error);
    }
  }
  await browser.close();
})();
