const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://www.cyamoda.com/');

    // Obtener el contenido HTML de la página
    const htmlContent = await page.content();

    // Guardar el contenido HTML en un archivo
    fs.writeFileSync('pagina.html', htmlContent);
    console.log("Contenido HTML guardado en 'pagina.html'");
  } catch (error) {
    console.error("Error al obtener el contenido HTML:", error);
  }

  await browser.close();
})();
