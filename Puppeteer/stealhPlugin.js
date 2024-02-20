// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra') // npm i puppeteer-extra puppeteer-extra-plugin-stealth --save
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

// Usar CHROME, en chrome://version copiamos el executablepath y profilepath e invertimos los slashes.
// Borrando el profile y eliminando chrome de la barra de tareas para que funcione mejor
puppeteer.launch({ headless: false, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', userdatadir: 'C:/Users/Pau Pons/AppData/Local/Google/Chrome/User Data' }).then(async browser => {
// puppeteer.launch({ headless: true }).then(async browser => {
  console.log('Running tests..')
  const page = await browser.newPage()
  await page.goto('https://bot.sannysoft.com')
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await page.screenshot({ path: 'testresult.png', fullPage: true })
  await browser.close()
  console.log(`All done, check the screenshot. ✨`)
})