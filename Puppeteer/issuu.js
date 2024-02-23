const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: "./tmp",
    });
    const page = await browser.newPage();
    const url = 'https://www.hobbyelegno.it/catalogo.php'
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    // const htmlContent = await page.content();
    // console.log(htmlContent);

    const regex = /issuu.com\/(.*?)\/.*?\/(.*?)(?:\/|\?)/;
    const urls = await page.$$eval('.post-info a', els => {
        return els.map(el => {
            return {
                href: el.href,
                title: el.textContent.trim()
            }
        })
    });

    urls.forEach(link => {
        const match = link.href.match(regex);
        if (link.title !== ''){
            issuu(match[1], match[2], browser, link.title);
        }
    });

    
    // await browser.close();
})();

async function issuu(id, hash, browser, title){
    const url = `https://reader3.isu.pub/${id}/${hash}/reader3_4.json`;
    
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const page = await browser.newPage();
    await page.goto(url);

    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await page.waitForSelector('pre');
    const json = await page.evaluate(() => {
        const preElement = document.querySelector('pre').textContent;
        if (preElement) {
          return preElement;
        }
        return null;
      });

      const images = [];
      const data = JSON.parse(json);
      const imgs = data.document.pages;
      imgs.forEach(image => {
        images.push(image.imageUri);
      });

    datas(images, title);
    // await browser.close();

}

async function datas(images, title){
    console.log(`El catálogo ${title} `);
    for(const img of images){
        console.log(`${img}`);
    }
}