const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: './tmp'
    });
    const page = await browser.newPage();
    await page.goto('https://www.decathlon.es/es/colecciones/ropa-de-verano');

    await page.waitForSelector('.product-block-top-main');
    const products = await page.$$('.product-block-top-main');

    const prods = [];
    await new Promise((resolve) => setTimeout(resolve, 2000));
    for (const product of products){
        let title;
        let marca;
        let url;
        let img;
        let price;
        try{
            title = await page.evaluate((el)=> el.querySelector('a > span').textContent, product);
            marca = await page.evaluate((el)=> el.querySelector('strong').textContent, product);
            
            url = await page.evaluate((el) => el.querySelector('a').href, product);
            img = await page.evaluate((el) => el.querySelector('img').src, product);
            price = await page.evaluate((el) => el.querySelector('[aria-label="precio"]').textContent, product);

        }catch (error){}

        const objprod = {
            title: title,
            marca: marca,
            url: url,
            image: img,
            price: price
        };
        prods.push(objprod);
    }

    const prodsJs = JSON.stringify(prods);
    console.log(prodsJs);
    // return prodsJs;

    await page.close();

})();