const puppeteer = require("puppeteer");
const readline = require("readline");

// Funciones para escribir en consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: "./tmp", // Esta línea activa el modo incógnito
  });
  const page = await browser.newPage();

  //   const month = await askQuestion('Por favor, ingresa el mes p.e.(04) : ');
  //   console.log('El número ingresado es:', month);
  //   const month2 = parseInt(month) +1

  // Navegar a la URL deseada
  const url =
    "https://charterenmenorca.mybooking.es/api/booking/frontend/products/23/occupation?from=2024-04-01&to=2024-05-01&api_key=5YTw3PxevdHAJXBk1FlND84uyEr9obVaCWhUKOnLMGcQqZIp&duration_scope=in_one_day&firstday=true";
  //   const url =`https://charterenmenorca.mybooking.es/api/booking/frontend/products/23/occupation?from=2024-${month}-01&to=2024-${month2}-01&api_key=5YTw3PxevdHAJXBk1FlND84uyEr9obVaCWhUKOnLMGcQqZIp&duration_scope=in_one_day&firstday=true`;
  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

    const html = await page.content();
    // console.log(html);
  // Accedemos al contenido JSON

  const json = await page.evaluate(() => {
    const content = document.querySelector('body');
    if (content) {
      return content.textHTML;
    }
    return null;
  });
  console.log(json);
  // Obtener el HTML de la página
  //   const htmlContent = await page.content();

  //   // Imprimir el HTML en la consola
  //   console.log(htmlContent);

    await browser.close();
})();

// const puppeteer = require('puppeteer');
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// function askQuestion(question) {
//   return new Promise((resolve, reject) => {
//     rl.question(question, (answer) => {
//       resolve(answer);
//     });
//   });
// }

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   const number = await askQuestion('Por favor, ingresa un número: ');
//   console.log('El número ingresado es:', number);

//   const url = `https://charterenmenorca.mybooking.es/api/booking/frontend/products/23/occupation?from=${number}&to=2024-04-01&api_key=5YTw3PxevdHAJXBk1FlND84uyEr9obVaCWhUKOnLMGcQqZIp&duration_scope=in_one_day&firstday=true`;

//   console.log('URL construida:', url);

//   await browser.close();
//   rl.close();
// })();
