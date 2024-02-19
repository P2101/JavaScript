const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();

  // Habilitar la intercepción de solicitudes
  await page.setRequestInterception(true);
  await new Promise((resolve) => setTimeout(resolve, 2000));


  // Hacemos la petición POST
  page.on("request", (interceptedRequest) => {
    console.log("hola");
    // Verificar si la solicitud es la que deseamos modificar
    if (
      interceptedRequest.url() ===
      "https://www.cyamoda.com/on/demandware.store/Sites-Cya_MX-Site/es_MX/CQRecomm-Start"
    ) {
      // Modificar el cuerpo de la solicitud según el formato requerido
      interceptedRequest.continue({
        method: "POST",
        postData:
          "auid=&scid=a89c22ce85ab67921a08f87904&pid0=3078666&pid1=3081941&pid2=3084455&pid3=3081723&pid4=3081722&pid5=3080004&pid6=3080003&pid7=3079316&pid8=3079231&pid9=3079213",
        headers: {
          ...interceptedRequest.headers(),
          "Content-Type": "application/x-www-form-urlencoded",
          authority: "www.cyamoda.com",
          accept: "*/*",
          "accept-language": "es-ES,es;q=0.9,en;q=0.8,ca;q=0.7",
          //   'cookie': 'dwanonymous_1fbc810e60246309b158f27012a92cfc=acnHnYRTHiIYvqSPcmsyCi3raJ; _sp_id.a041=9daf170f5720aaa2.1708172286.1.1708172301.1708172286; dwac_65f02f1f75d85f08311e461ce0=TNP9b8xyplXm5wvuf8wiDyAyf6q_ohQ2K7w%3D|dw-only|||MXN|false|Mexico%2FGeneral|true; cqcid=acnHnYRTHiIYvqSPcmsyCi3raJ; cquid=||; sid=TNP9b8xyplXm5wvuf8wiDyAyf6q_ohQ2K7w; __cq_dnt=0; dw_dnt=0; dwsid=T3asZmZsYyMEbxggF82W3yOXLqMVvNFAyTRcO4kkZPYMRJikpLmI6oLmESOdKxaq8rakhjq1nG1zGOipRkRqfQ==',
          origin: "https://www.cyamoda.com",
          referer: "https://www.cyamoda.com/",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36",
        },
      });
      console.log("hola4");
    } else {
      interceptedRequest.continue(); // Dejar pasar todas las demás solicitudes sin modificar
    }
  });
//   await page.setRequestInterception(true);
await new Promise((resolve) => setTimeout(resolve, 2000));
  
  page.on("response", async (response) => {
    console.log("hola2");
    if (
      response.url() ===
      "https://www.cyamoda.com/on/demandware.store/Sites-Cya_MX-Site/es_MX/CQRecomm-Start"
    ) {
      console.log("hola3");
      const status = response.status();
      const responseHTML = await response.text();
      console.log("Estado de la respuesta:", status);
      console.log("HTML de la respuesta:", responseHTML);
    } else {
      console.log("no entra");
    }
  });
  //   try {
  //     await page.goto('https://www.cyamoda.com/');

  //     // Obtener el contenido HTML de la página después de la solicitud POST
  //     const htmlContent = await page.content();
  //     console.log(htmlContent);
  //   } catch (error) {
  //     console.error("Error al realizar la solicitud POST:", error);
  //   }

//   await browser.close();
})();

//    'authority': 'www.cyamoda.com',
//    'accept': '*/*',
//    'accept-language': 'es-ES,es;q=0.9,en;q=0.8,ca;q=0.7',
//    'content-type': 'application/x-www-form-urlencoded',
// //    'cookie': 'dwanonymous_1fbc810e60246309b158f27012a92cfc=acnHnYRTHiIYvqSPcmsyCi3raJ; _sp_id.a041=9daf170f5720aaa2.1708172286.1.1708172301.1708172286; dwac_65f02f1f75d85f08311e461ce0=TNP9b8xyplXm5wvuf8wiDyAyf6q_ohQ2K7w%3D|dw-only|||MXN|false|Mexico%2FGeneral|true; cqcid=acnHnYRTHiIYvqSPcmsyCi3raJ; cquid=||; sid=TNP9b8xyplXm5wvuf8wiDyAyf6q_ohQ2K7w; __cq_dnt=0; dw_dnt=0; dwsid=T3asZmZsYyMEbxggF82W3yOXLqMVvNFAyTRcO4kkZPYMRJikpLmI6oLmESOdKxaq8rakhjq1nG1zGOipRkRqfQ==',
// //    'origin': 'https://www.cyamoda.com',
// //    'referer': 'https://www.cyamoda.com/',

//    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',

// const puppeteer = require("puppeteer");

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: false,
//     userDataDir: "./tmp",
//   });
//   const page = await browser.newPage();

//   // Habilitar la intercepción de solicitudes
//   await page.setRequestInterception(true);

//   // Hacemos la petición POST
//   page.on('request', interceptedRequest => {
//     // Verificar si la solicitud es la que deseamos modificar
//     if (interceptedRequest.url() === 'https://www.cyamoda.com/on/demandware.store/Sites-Cya_MX-Site/es_MX/CQRecomm-Start') {
//       // Modificar el cuerpo de la solicitud según el formato requerido
//       interceptedRequest.continue({
//         method: 'POST',
//         postData: 'auid=&scid=a89c22ce85ab67921a08f87904&pid0=3078666&pid1=3081941&pid2=3084455&pid3=3081723&pid4=3081722&pid5=3080004&pid6=3080003&pid7=3079316&pid8=3079231&pid9=3079213',
//         headers: {
//           ...interceptedRequest.headers(),
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       });
//     } else {
//       interceptedRequest.continue(); // Dejar pasar todas las demás solicitudes sin modificar
//     }
//   });

//   // Agrega el evento 'load' para verificar cuándo la página ha cargado completamente
//   page.on('load', () => {
//     console.log('La página ha cargado completamente');
//     // Aquí puedes realizar acciones adicionales después de que la página haya cargado completamente
//   });

//   page.on('response', async response => {
//     console.log('hola2');
//     if (response.url() === 'https://www.cyamoda.com/on/demandware.store/Sites-Cya_MX-Site/es_MX/CQRecomm-Start') {
//         console.log('hola3');
//         const status = response.status();
//         const responseHTML = await response.text();
//         console.log('Estado de la respuesta:', status);
//         console.log('HTML de la respuesta:', responseHTML);
//     } else {
//         console.log('no entra');
//     }
//   });

//   // Cerramos el navegador cuando hayamos terminado de trabajar con él
//   await browser.close();
// })();
