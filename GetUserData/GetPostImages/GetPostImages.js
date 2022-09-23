const PrepareTheBrowser = require("../PrepareTheBrowser/PrepareTheBrowser")

async function GetPostImages(postURL) {
    let browserParameter = {headless: false,}
    let browserObject = await PrepareTheBrowser(browserParameter)
    let browser = browserObject.browser
    let page = browserObject.page

    await page.goto(postURL, { waitUntil: "networkidle0", timeout: 0 });
    await page.waitForSelector('article div._aagv', {visible: true,});
    
    var imageURLArr = []
    do{
        //GET THE POSSIBLE IMAGES AND THEN CLICK NEXT TO GET THE NEXT GROUP OF IMAGES
        const imageURL = await page.evaluate(() => {
        const container = document.querySelector("article");
        const elements = container.querySelectorAll(' div._aagv > img');
        const linksArr = Array.from(elements).map(link => link.getAttribute('src'));
        return linksArr
        })
        //COLLECT ALL THE IMAGES IN ONE ARRAY AND NEGLECT ANY DUPLACTIONS OR NULL VALUES
        imageURL.forEach(element => {
            if( ! imageURLArr.includes(element) && element != null ) imageURLArr.push(element)
        });
        //LOOP ENDING CONDITION
        try{ await page.click('button._aahi') }
        catch { break }
    }while(1===1)

    await browser.close();
    return imageURLArr

}

module.exports = GetPostImages;



