const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  // Navigate to a website
  await page.goto("https://www.example.com");
  // Find and click on the first link
  const firstLink = await page.$("a");
  await firstLink.click(); // Necesitas esperar a que se complete la acción de hacer clic
  // Wait for some content to load
  await page.waitForSelector(".help-article");
  // Extract data
  const title = await page.evaluate(() => {
    // Utiliza document.querySelector para seleccionar el título
    const titleElement = document.querySelector(".help-article h1");
    return titleElement ? titleElement.innerText : ""; // Maneja el caso si el elemento no se encuentra
  });
  const articleBody = await page.evaluate(() => {
    // Utiliza document.querySelector para seleccionar el cuerpo del artículo
    const articleBodyElement = document.querySelector(".help-article p");
    return articleBodyElement ? articleBodyElement.textContent : ""; // Maneja el caso si el elemento no se encuentra
  });
  // Print the results
  console.log("Title:", title);
  console.log("Article Body:", articleBody);
  // Close the browser
  await browser.close(); // Necesitas usar await aquí para asegurarte de que el navegador se cierre después de todas las operaciones
})();
