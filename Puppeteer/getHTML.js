const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: "./tmp",
        // args: ['--incognito'] // Esta línea activa el modo incógnito, verificar si funciona
    });
    const page = await browser.newPage();
    const url = 'https://www.twitch.tv/'
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    const htmlContent = await page.content();
    console.log(htmlContent);

    await browser.close();
})();
