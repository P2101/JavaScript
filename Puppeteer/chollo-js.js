const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: "./tmp",
    });
    const page = await browser.newPage();

    const url = 'https://www.chollometro.com/';
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
    const html = await page.content();

    const regex = /INITIAL_STATE__ = (.*?);/;
    const json = html.match(regex);

    
    if (json) {
        // console.log("Mensaje encontrado:", json[1]);
        const data = JSON.parse(json[1]);

        // Acceder a las distintas carpetas del JSON
        items = data.widgets.hottestWidget.threads
        
        items.forEach(function(item) {
            // Acceder a las propiedades title, price y url de cada hilo
            let title = item.title;
            let price = item.price;
            let url = item.url;
        
            console.log("Título:", title);
            console.log("Precio:", price);
            console.log("URL:", url);

            // Faltaría añadirlas en un object
        });
  
        console.log()
    } else {
        console.log("No se encontró el mensaje.");
    }

    await browser.close();
})();
