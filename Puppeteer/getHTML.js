// Para obtener el HTML (A veces no puede devolverlo entero)
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--incognito'] // Esta línea activa el modo incógnito
    });
    const page = await browser.newPage();

    // Navegar a la URL deseada
    // await page.goto('https://www.twitch.tv/');
    const url = 'https://www.twitch.tv/'
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    // Obtener el HTML de la página
    const htmlContent = await page.content();

    // Imprimir el HTML en la consola
    console.log(htmlContent);

    await browser.close();
})();
