const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('', {
        waitUntil: 'load' // espera hasta que la web esté cargada
    });

    const is_disabled = await page.$('.a-disabled .a-last') !== 'null';

    console.log(is_disabled);
    
    await browser.close();
})();