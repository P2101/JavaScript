const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp" // para que no salte el captcha
    });
    const page = await browser.newPage();
    await page.goto('https://www.amazon.es/stores/page/46CE9BDD-3F6F-4EC2-A8D2-64C5A646808C?ingress=3&visitId=c5d5e809-485f-429f-9d5f-cd05c3237acf&ref_=nav_cs_amazonbasics');

    try {
        await page.waitForSelector('[data-widgettype="ProductGrid"]', { timeout: 5000 }); // Espera a que aparezca el elemento
        const recomendados = await page.evaluate(() => {
            const items = document.querySelectorAll('[data-widgettype="ProductGrid"]');
        
            const arr = [];
            for(let item of items){
                canal = {}
                canal.image = item.querySelector('img').src;
                arr.push(canal);
            }
            return arr;
        });
        console.log(recomendados);
    } catch (error) {
        console.error('No se pudo encontrar el elemento:', error);
    }

    await browser.close();
})();

