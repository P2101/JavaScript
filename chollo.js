const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp", // para que no salte el captcha
  });
  const page = await browser.newPage();
  await page.goto("https://www.chollometro.com/");

  const producthandles = await page.$$(".threadGrid");
  // const producthandles = await page.$$('.s-main-slot .s-result-list .s-search-results .sg-row > .s-result-item');

  let i = 0;
  let items = [];
  for (const producthandle of producthandles) {
    let title = "Null";
    let price = "Null";
    let img = "Null";
    try {
      title = await page.evaluate(
        (el) => el.querySelector(".threadGrid-title a").innerText,
        producthandle
      );
    } catch (error) {}
    try {
        price = await page.evaluate(
            (el) => el.querySelector(".threadItemCard-price").innerText,
            producthandle
            );
            
            //   const real_price = parseFloat(price.replace(" €", "")) / 100;
            const is_disabled = await page.$('.vote-box').textContent;

            console.log(title);
            console.log(is_disabled);
            // console.log(price);
            // console.log(price)
        } catch (error) {}
        
    if (title !== "Null") {
      items.push({ title, price });
    }
  }
  console.log(items.length);

  await browser.close();
})();
