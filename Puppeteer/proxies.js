// Verificar la calidad del proxy en firefox
// https://addons.mozilla.org/en-US/firefox/addon/proxy-checker/
const puppeteer = require('puppeteer');

(async() => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--proxy-server=http://213.168.210.76:80']
    });
    const page = await browser.newPage();
    await page.goto('https://whatismyipaddress.com/', { timeout: 6000 }); // Aumentar el tiempo máximo de espera a 60 segundos (60000 milisegundos)

    
    // Esperar a que la página se cargue completamente
    await page.waitForSelector('body');

    // Cerrar el navegador después de 5 segundos
    await new Promise(resolve => setTimeout(resolve, 5000));
    await browser.close();
  } catch (error) {
    console.error('Ocurrió un error:', error);
  }
})();






// proxy con proxyChain
// https://nodemaven.com/?a_aid=michaelkitas --> obtener high quality proxies de PAGO
// const puppeteer = require('puppeteer');
// const proxyChain = require('proxy-chain');

// (async() => {
//     const oldProxyUrl = 'http://bob:password123@proxy.example.com:8000';
//     const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

//     // Prints something like "http://127.0.0.1:45678"
//     console.log(newProxyUrl);

//     const browser = await puppeteer.launch({
//         args: [`--proxy-server=${newProxyUrl}`],
//     });


//     const page = await browser.newPage();
//     await page.goto('https://www.example.com');
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     await page.screenshot({ path: 'example.png' });
//     await browser.close();

//     // Clean up
//     await proxyChain.closeAnonymizedProxy(newProxyUrl, true);
// })();