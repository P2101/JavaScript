// const puppeteer = require("puppeteer");

// (async () => {
// //   const browser = await puppeteer.launch({
// //     headless: false,
// //     defaultViewport: false,
// //     userDataDir: "./tmp", // para que no salte el captcha
// //     // ignoreDefaultArgs: ["--enable-automation"],
// //   });
// //   const page = await browser.newPage();

// //   const headers = {
// //     authority: "www.google.com",
// //     accept:
// //       "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
// //     "accept-language": "es-ES,es;q=0.9,en;q=0.8,ca;q=0.7",
// //     "cache-control": "max-age=0",
// //     "upgrade-insecure-requests": "1",
// //     "user-agent":
// //       "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
// //     "x-client-data":
// //       "CJe2yQEIorbJAQipncoBCITnygEIlqHLAQiFoM0BCI/hzQEIn+7NAQin7s0BCN3uzQEIg/DNAQiG8M0BCMDxzQEIrvLNAQj7880BCJD1zQEInvbNARjimM0BGKfqzQEY+fLNAQ==",
// //   };

// //   await page.setExtraHTTPHeaders(headers);
// //   await page.goto("https://www.tiffany.com/"); // cercar una altra url! 

//   try {
//     // Ejecutar código JavaScript en el contexto de la página para realizar la solicitud POST
//     const response = await page.evaluate(() => {
//       return fetch('https://www.cyamoda.com/on/demandware.store/Sites-Cya_MX-Site/es_MX/CQRecomm-Start', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ key: 'auid=&scid=a89c22ce85ab67921a08f87904&pid0=3078666&pid1=3081941&pid2=3081723&pid3=3081722&pid4=3080004&pid5=3080003&pid6=3079316&pid7=3079231&pid8=3079213&pid9=3078807' }) // Cuerpo de la solicitud POST en formato JSON
//       })
//       .then(response => response.json())
//       .catch(error => console.error('Error en la solicitud POST:', error));
//     });

//     console.log(response); // Imprimir la respuesta de la solicitud POST
//   } catch (error) {
//     console.error("Error al realizar la solicitud POST:", error);
//   }

//   await browser.close();
// })();
const puppeteer = require("puppeteer");

(async () => {
  // Iniciar Puppeteer y crear una nueva página
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Hacer la solicitud POST
    await page.goto('https://www.cyamoda.com/on/demandware.store/Sites-Cya_MX-Site/es_MX/CQRecomm-Start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authority': 'www.cyamoda.com',
        'accept': '*/*',
        'cookie': 'dwac_65f02f1f75d85f08311e461ce0=5aEh1ZhfQMV0JhiwgnCf1mhO6ltgraxlyO8%3D|dw-only|||MXN|false|Mexico%2FGeneral|true; cqcid=acnHnYRTHiIYvqSPcmsyCi3raJ; cquid=||; sid=5aEh1ZhfQMV0JhiwgnCf1mhO6ltgraxlyO8; dwanonymous_1fbc810e60246309b158f27012a92cfc=acnHnYRTHiIYvqSPcmsyCi3raJ; __cq_dnt=0; dw_dnt=0; dwsid=8cqqCEZEm8w3WHhcOWK78XwlYYa-tndsi5FcTvF06Eee-FKu-wgg690kOyYpauFWiGsEn71UJD69_vdcGfXCfA==; yotpo_pixel=0d3632f7-ab33-480c-a550-6e350fc3eec4; _sp_ses.a041=*; _sp_id.a041=9daf170f5720aaa2.1708172286.1.1708172291.1708172286',
        'accept-language': 'es-ES,es;q=0.9,en;q=0.8,ca;q=0.7',
        'content-type': 'application/x-www-form-urlencoded',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
   
      },
      body: JSON.stringify({ key: 'auid=&scid=a89c22ce85ab67921a08f87904&pid0=3078666&pid1=3081941&pid2=3081723&pid3=3081722&pid4=3080004&pid5=3080003&pid6=3079316&pid7=3079231&pid8=3079213&pid9=3078807' })
    });

    // Obtener el contenido HTML de la página después de la solicitud POST
    const htmlContent = await page.content();
    console.log(htmlContent);
  } catch (error) {
    console.error("Error al realizar la solicitud POST:", error);
  }

  await browser.close();
})();


// curl 'https://www.cyamoda.com/on/demandware.store/Sites-Cya_MX-Site/es_MX/CQRecomm-Start' \
  
   //    'origin: https://www.cyamoda.com',
//    'referer: https://www.cyamoda.com/mujer/ropa/vestidos/',
   
   