const PrepareTheBrowser = require("../PrepareTheBrowser/PrepareTheBrowser")

async function GetProfilePicture(UserURL) {
    let browserParameter = {headless: false,}
    let browserObject = await PrepareTheBrowser(browserParameter)
    let browser = browserObject.browser
    let page = browserObject.page

    await page.goto(UserURL, { waitUntil: "networkidle0", timeout: 0 });
    await page.waitForSelector('header._aa_h img', {visible: true, });
    const userImageURL = await page.evaluate(() => document.querySelector('header._aa_h img').getAttribute('src'));
    await browser.close();

    return userImageURL
}

module.exports = GetProfilePicture;