const puppeteer = require('puppeteer');

async function GetPostVideos(videoURL) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://instadp.io/reels-downloader/", { waitUntil: "load", timeout: 0 });
    await page.type('input[name=url]',videoURL, {delay : 10})
    await page.click('button[type=submit]',{delay : 10})
    await page.waitForSelector('div.video-wrapper', {visible: true, timeout: 0 });
    const href = await page.$eval("div.video-wrapper > a", (elm) => elm.href);
    await browser.close()

    return href

}

module.exports = GetPostVideos;