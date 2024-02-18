const puppeteer = require("puppeteer");
const express = require("express");

const app = express();
app.set("port", 9101);
app.use(express.json());

// Ruta para recibir el documento
app.post("/", (req, res) => {
  res.send("Tu documento es " + req.body.documento);
});

// Ruta para interactuar con Sunat
app.post("/sunat", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp", // para que no salte el captcha
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36"
    );
    await page.goto(
      "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp"
    );

    // Esperar a que el input esté disponible
    await page.waitForSelector("#txtRuc");
    const body_filtros = req.body; // Se asume que body_filtros está definido

    // Escribir el número de documento en el input
    await page.type("#txtRuc", body_filtros.documento);

    // Hacer clic en el botón de aceptar
    await page.waitForSelector("#btnAceptar");
    await page.click("#btnAceptar");

    // Esperar antes de extraer la información
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Extraer la información necesaria
    let exit = await page.evaluate(() => {
      var element = document.querySelectorAll(".list-group-item-heading");
      return {
        razon_social: element[1].innerHTML,
        actividades: element[10].innerHTML,
      };
    });

    // Enviar la respuesta al cliente
    res.send(exit);

    // Cerrar el navegador
    await browser.close();
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    res.sendStatus(500);
  }
});

// Iniciar el servidor
app.listen(app.get("port"), () => {
  console.log("Aplicación ejecutándose en el puerto", app.get("port"));
});

// Meu codi
// const puppeteer = require("puppeteer");
// const express = require("express");

// const app = express();
// app.set("port", 9101);
// app.use(express.json());

// app.post("/", (req, res) => {
//   res.send("tu documento es " + req.body.documento);
// });

// app.listen(app.get("port"), () =>
//   // habilitar el listener
//   console.log("app running on port", app.get("port"))
// );

// // const browser = await puppeteer.launch({
// //   headless: false,
// //   defaultViewport: false,
// //   userDataDir: "./tmp",
// // });
// const browserP = puppeteer.launch({
//   args: ["--no-sandbox", "--disable-setuid-sandbox"], // min 9.11, però aquí falla cosa
//   headless: false,
//   userDataDir: "./tmp",
// });
// app.post("/sunat", (req, res) => {
//   let page;
//   let body_filtros = req.body;
//   console.log(body_filtros.documento);
//   (async () => {
//     page = await  browserP.newPage();
//     // await page.setUserAgent(
//     //   "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36"
//     // );
//     const headers = {
//       Accept:
//         "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//       "Accept-Language": "es-ES,es;q=0.9,en;q=0.8,ca;q=0.7",
//       "Cache-Control": "max-age=0",
//       Connection: "keep-alive",
//       // Cookie:
//         // "ITMRCONSRUCSESSION=8TbtlQdptCp2JWbvctfh2ZH7hr1WBBZTNGvrcVMB0qrDtjlTdDc6n1t97g9b3vvrGfbK22qB3Jp1PGLGJd3Ny29WBqc16jJ7FY6mvjZ9jXQGnCh16Ln32y56nDyQ43zzHlqSPn3rL18JrBjWSxd2TQ6VBfgsMpbpdhFzQcXfJyP2LN2MpLQY5pvsQpsfnhh2LH4q0m1f1p7w9tSnCSYBLlv1lm5GQGSzfLJJVJppJ2wS3vGhxKCK5NlR5TwC0TBK\u0021-1874825302\u0021906487614; TS01fda901=014dc399cb1d47447b048b73ea2eead87884eec9b2629863ccb27daec11b9ba1ace802897cefaac62bf39ae4014d4809b65c34e4fb5b900001661e1f6b80b847915293b5b9; TSf3c1dbbd027=08fe7428c8ab200034f3461c0646d18144428fdcaff6fbae40097ec609467684a74320e0a7c7d478085d26851811300025dbe4fe01f7a8160f44a08fef2d9ae92641bb3a0249231407cdb0b4747515e927e2fbb91e6650f25288545e0324522b",
//     };
//     await page.setExtraHTTPHeaders(headers);
//     await page.goto(
//       "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp"
//     );
//     // const htmlContent = await page.content();
//     // console.log(htmlContent);
//     await page.waitForSelector("#txtRuc");
//     await page.type("#txtRuc", body_filtros.documento);
//     await page.waitForSelector("#btnAceptar");
//     await page.click("#btnAceptar");
//     await page.waitForTimeOut(3000);
//     let exit = await page.evaluate(() => {
//       var element = document.querySelectorAll(".list-group-item-heading");
//       return {
//         razon_social: element[1].innerHTML,
//         actividades: element[10].innerHTML,
//       };
//     })();
//     res.send(exit);
//   })()
//     .catch((err) => res.sendStatus(500))
//     .finally(async () => await page.close());
// });
