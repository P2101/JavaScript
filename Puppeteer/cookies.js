const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        // executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        defaultViewport: null,
        // userDataDir: 'C:/Users/Pau Pons/AppData/Local/Google/Chrome/User Data',
        args: ['--incognito'],
    });
    const page = await browser.newPage();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const url = 'https://mail.google.com/mail/u/0/#inbox';
    
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await page.waitForSelector('[name="identifier"]');
    await page.type('[name="identifier"]', 'bobowich11');
    await page.click('#identifierNext');
})();
