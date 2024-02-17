const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Habilitar la intercepción de solicitudes
  await page.setRequestInterception(true);

  page.on('request', interceptedRequest => {
    // Verificar si la solicitud es la que deseamos modificar
    if (interceptedRequest.url() === 'https://www.cyamoda.com/on/demandware.store/Sites-Cya_MX-Site/es_MX/CQRecomm-Start') {
      // Modificar el cuerpo de la solicitud según el formato requerido
      interceptedRequest.continue({
        method: 'POST',
        postData: 'auid=&scid=a89c22ce85ab67921a08f87904&pid0=3078666&pid1=3081941&pid2=3081723&pid3=3081722&pid4=3080004&pid5=3080003&pid6=3079316&pid7=3079231&pid8=3079213&pid9=3078807',
        headers: {
          ...interceptedRequest.headers(),
          'Content-Type': 'application/x-www-form-urlencoded' 
        }
      });
    } else {
      interceptedRequest.continue(); // Dejar pasar todas las demás solicitudes sin modificar
    }
  });

  try {
    await page.goto('https://www.cyamoda.com/');

    // Obtener el contenido HTML de la página después de la solicitud POST
    const htmlContent = await page.content();
    console.log(htmlContent);
  } catch (error) {
    console.error("Error al realizar la solicitud POST:", error);
  }

  await browser.close();
})();


// headers: {
//     'Content-Type': 'application/json',
//     'authority': 'www.cyamoda.com',
//     'accept': '*/*',
//    // 'cookie': 'dwac_65f02f1f75d85f08311e461ce0=5aEh1ZhfQMV0JhiwgnCf1mhO6ltgraxlyO8%3D|dw-only|||MXN|false|Mexico%2FGeneral|true; cqcid=acnHnYRTHiIYvqSPcmsyCi3raJ; cquid=||; sid=5aEh1ZhfQMV0JhiwgnCf1mhO6ltgraxlyO8; dwanonymous_1fbc810e60246309b158f27012a92cfc=acnHnYRTHiIYvqSPcmsyCi3raJ; __cq_dnt=0; dw_dnt=0; dwsid=8cqqCEZEm8w3WHhcOWK78XwlYYa-tndsi5FcTvF06Eee-FKu-wgg690kOyYpauFWiGsEn71UJD69_vdcGfXCfA==; yotpo_pixel=0d3632f7-ab33-480c-a550-6e350fc3eec4; _sp_ses.a041=*; _sp_id.a041=9daf170f5720aaa2.1708172286.1.1708172291.1708172286',
//     'accept-language': 'es-ES,es;q=0.9,en;q=0.8,ca;q=0.7',
//     'content-type': 'application/x-www-form-urlencoded',
//     'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',

//   }