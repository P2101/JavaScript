const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp", // para que no salte el captcha
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.amazon.es/stores/page/46CE9BDD-3F6F-4EC2-A8D2-64C5A646808C?ingress=3&visitId=c5d5e809-485f-429f-9d5f-cd05c3237acf&ref_=nav_cs_amazonbasics"
  );

  // await page.screenshot({path: 'example.png'});
  const producthandles = await page.$$('[data-widgettype="ProductGrid"] div');
  // const producthandles = await page.$$('.s-main-slot .s-result-list .s-search-results .sg-row > .s-result-item');

  let i = 0;
  let items = [];
  for (const producthandle of producthandles) {
    let title = "Null";
    let price = "Null";
    let img = "Null";
    try {
      title = await page.evaluate(
        (el) =>
          el.querySelector('[data-testid="product-grid-title"]').innerText,
        producthandle
      );
    } catch (error) {}
    try {
      price = await page.evaluate(
        (el) => el.querySelector("span > span > span").innerText,
        producthandle
      );

      const real_price = parseFloat(price.replace(" €", "")) / 100;
      console.log(title);
      // console.log(price)
    } catch (error) {}

    if (title !== "Null") {
      items.push({ title, price });
    }
}
console.log(items.length);

  await browser.close();
})();
