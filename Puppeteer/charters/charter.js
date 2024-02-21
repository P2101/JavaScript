const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();

  const url = "https://charterenmenorca.com/alquiler-barcos-menorca/";
  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

  await page.waitForSelector(".type-barco_alquiler");
  const boats = await page.$$(".type-barco_alquiler");

  const charters = [];
  for (const boat of boats) {
    let title = "Null";
    let info = [];
    let url = "Null";
    let boatinfo = [];
    try {
      title = await page.evaluate(
        (el) => el.querySelector(".elementor-heading-title > a").textContent,
        boat
      );
      // console.log("Title:", title);

      const boatInfoElements = await boat.$$(".elementor-icon-list-text");
      for (const infoElement of boatInfoElements) {
        info = await page.evaluate((el) => el.textContent.trim(), infoElement);
        boatinfo.push(info);
        // console.log("Info:", boatinfo);
      }
      url = await page.evaluate(
        (el) => el.querySelector(".elementor-heading-title > a").href,
        boat
      );
      // console.log("Url:", url);
    } catch (error) {
      console.error("Error:", error);
    }
     // PARA GUARDAR EN UN CSV
    // if (title !== 'Null'){
    //   charters.push(title);
    //   charters.push(boatinfo);
    //   charters.push(url);
    //   fs.appendFile('Puppeteer/charters/results.csv', `${title},${boatinfo[0].replace('Eslora: ', '')},${boatinfo[1].replace('Manga: ', '')}, ${boatinfo[2].replace('Capacidad: ', '')},${url}\n`, (err) => {
    //     if (err) throw err;
    //     console.log('The "data to append" was appended to file!');
    //   });
    // }

    // Convertir a Objeto
    const boatObject = {
      title: title,
      eslora: boatinfo[0].replace("Eslora: ", ""),
      manga: boatinfo[1].replace("Manga: ", ""),
      capacidad: boatinfo[2].replace("Capacidad: ", ""),
      url: url,
    };

    // Agregar el objeto del barco al array
    charters.push(boatObject);

    // // Esto NOO
    // charters.title = title;
    // charters.eslora = boatinfo[0];
    // charters.manga = boatinfo[1];
    // charters.capacidad = boatinfo[2];
    // charters.url = url;
  }
  const chartersJSON = JSON.stringify(charters);
  console.log(chartersJSON);
  await browser.close();
})();
