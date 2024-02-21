const puppeteer = require('puppeteer');
const captcha = "03AFcWeA43pFQ7O9mi5ddNo6SZY7KzGZN5ZF7N1qcz1D5Jn6KA4iF1r8PYFMXpahprymLJVZnTyVNuBwz_LQmFsL_VQ_ntdiGVbZDBr01GhyeAKKZywCm8ByZc8M2TGXEDNXk-3xGnjsc0Xx9bbI5-e7FBsIUqf4eEu4ltUeoYZP87Meuxs8hN6_stFXmELo52FMPdVUPKk4VmTdwaXctTgW1BRfr5sHceFftAPjtdMRyksDbG9rd_cOCZPu7bcydDvHOiu-koCAVMd1IR9jcZTQJmrXAWiXXtqgQfSxcUuP6Tj97JBtNnMzBj7VPP6NKhSt3IndgiHNbJU3b1kEJEnskJRLytM1zY6gqLc0cB9IpHuuEbLJiQWEzFHGSMNGEQ7bc1rh4p1I4vQ2__FVCz9OD83ZQQOqP5_9nv6D0HNMjoTPNNlYxaaBRO2yTLb9zcy16dyWzrqQ6SIg6q4LGoosUTQ7K2Qi8IwAPYBx-U1RzDkYfez6_mdOmAknjw_aRJlReGDX4bfBN6VYQmNpBN-ZdhqnklYuqeOvvOBtVs8P4Wc0-0XciF_dGQU7iMFBp2Nf6LLPX9J8mXv5q4DN09dixPE-XpsVkNVQElzL_IuBUPPxzpH7TgFnMUPoo2Sn5H0lmb51Omj_QdyLOi1glqyfzVg6J2mNuLq1OLmIeMiqf8YfT17qePuea07lbkoTwZfLJY0XubMc2X";



(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: './tmp',
    });
    const page = await browser.newPage();
    await page.goto('https://carnetvacunacion.minsa.gob.pe/#/auth');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await page.click('[formcontrolname="doc_type"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.click('mat-option:nth-child(1)'); 
    await new Promise((resolve) => setTimeout(resolve, 1300));
    
    await page.type('[formcontrolname="doc"]', '758463396');
    await new Promise((resolve) => setTimeout(resolve, 2400));
    
    await page.type('[formcontrolname="issue_date"] input', '06/03/2019');
    await new Promise((resolve) => setTimeout(resolve, 2800));
    
    await page.type('[formcontrolname="birth_date"] input', '22/03/2000');
    await new Promise((resolve) => setTimeout(resolve, 3100));
    
    
    await page.waitForSelector('#g-recaptcha-response');
    await page.click('[formcontrolname="sessionStarted"');
    await new Promise((resolve) => setTimeout(resolve, 4000));
    // await page.evaluate(`document.getElementByClassName("recaptcha-checkbox-checkmark").innerHTML="${captcha}";`);
    await page.evaluate(`document.getElementById("g-recaptcha-response").innerHTML="${captcha}";`);
    // await page.evaluate(`document.querySelector("#g-recaptcha-response").innerHTML = '${captcha}';`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.click('.button-primario');

})();
