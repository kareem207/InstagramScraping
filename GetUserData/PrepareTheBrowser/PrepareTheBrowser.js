const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const CheckSession = require("../../AccessInstagram/CheckSession/CheckSession")
const Login = require("../../AccessInstagram/Login/Login")

async function PrepareTheBrowser(browserAttr) {
    //TEMP PLACEMENT OF THESE VARIABLES
    let userName = 'testtesto@usa.com';
    let password = 'adminPassword26';

    if(!await CheckSession()) await Login(userName,password)
    const browserX = await puppeteer.launch(browserAttr);
    const pageX = await browserX.newPage();
    const cookiesString = await fs.readFile('./dataExtractor/AccessInstagram/loginCookies.json');
    const cookiesData = await JSON.parse(cookiesString);
    await pageX.setCookie(...cookiesData);
    
    return({
        browser: browserX,
        page : pageX
    })
}

module.exports = PrepareTheBrowser;