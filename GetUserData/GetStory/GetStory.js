const PrepareTheBrowser = require("../PrepareTheBrowser/PrepareTheBrowser")

async function GetStory(storyURl) {
    let browserParameter = {headless:false}
    let browserObject = await PrepareTheBrowser(browserParameter)
    let browser = browserObject.browser
    let page = browserObject.page

    await page.goto(storyURl, { waitUntil: "networkidle0", timeout: 0 });
    try{await page.click('button._acan._acap._acau._acav')}
    catch{}
    await page.waitForSelector('img._aa63', {visible: true, });
    const storyData = await page.evaluate(() => {
        let VideoData = ""
        let CoverImageData = document.querySelector('img._aa63').getAttribute('src')
        //CHECK IF ITS A VIDEO STROY NOT ONLY AN IMAGE
        if(document.querySelector('video._aa63._ac3u') != null)
        VideoData = document.querySelector('video._aa63._ac3u > source').getAttribute('src')
        return ({
                StoryCoverImage : CoverImageData,
                StoryVideo : VideoData
            })
    });
    //await browser.close();
    return storyData
}

module.exports = GetStory;