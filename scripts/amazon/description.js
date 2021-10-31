export const amazonDescriptionRequest = async (url) => {
    try {
        let description;
        let attempt = 0;
        while (description == null || !description || attempt >= 3) {
            console.log("Getting Description");
            description = await getDescription(url);
            attempt++;
        }

        return description;
    } catch (e) {
        return e;
    }
};

const getDescription = async (url) => {
    let chrome = {};
    let puppeteer;
    if (process.env.NODE_ENV === "production") {
        // running on the Vercel platform.
        chrome = require("chrome-aws-lambda");
        puppeteer = require("puppeteer-core");
    } else {
        // running locally.
        puppeteer = require("puppeteer");
    }

    try {
        let browser = await puppeteer.launch({
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
        });
        const page = await browser.newPage();
        await page.goto(url);
        const iframeParagraph = await page.evaluate(() => {
            const iframe = document.getElementById("bookDesc_iframe");
            const iframeDoc =
                iframe.contentDocument || iframe.contentWindow.document;
            const iframeP = iframeDoc.getElementById("iframeContent");
            return iframeP.innerHTML;
        });
        await browser.close();
        return iframeParagraph;
    } catch (err) {
        console.error(err);
        return null;
    }
};
