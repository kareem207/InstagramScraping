const puppeteer = require('puppeteer');
const fs = require('fs').promises;

async function Login(instagramUserName,instagramPassword) {
    const browser = await puppeteer.launch({ 
        args: ['--incognito',],
        headless: true 
    });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/accounts/login', { waitUntil: "networkidle2" });
    await page.type('input[name=username]', instagramUserName, { delay: 20 });
    await page.type('input[name=password]', instagramPassword, { delay: 20 });
    await page.click('button[type=submit]', { delay: 20 }); 
    await page.waitForNavigation();
    const loginCookies = await page.cookies();
    await page.close();

    await fs.writeFile('./dataExtractor/AccessInstagram/loginCookies.json', JSON.stringify(loginCookies, null, 2));
    await fs.writeFile('./dataExtractor/AccessInstagram/loginDate.json', JSON.stringify(Date(), null, 2));


    
}

module.exports = Login;
