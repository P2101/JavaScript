const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://www.chollometro.com/');

    const html = await page.content();

    const regex = /lastPage":(\d+),/i;
    const match = html.match(regex);

    if (match) {
        console.log("El contenido es :", match[1]); // match[1] contiene el texto capturado entre paréntesis
    } else {
        console.log("La palabra clave no se encontró en el texto.");
    }

    await browser.close();

})();