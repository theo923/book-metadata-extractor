const https = require("https");
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

export const amazonRequest = async (url) => {
    try {
        // const response = await axios.get(
        //     "https://www.amazon.co.jp/%E6%97%A5%E6%9C%AC%E3%81%B8%E3%82%88%E3%81%86%E3%81%93%E3%81%9D%E3%82%A8%E3%83%AB%E3%83%95%E3%81%95%E3%82%93%E3%80%82-1%E3%80%90%E9%9B%BB%E5%AD%90%E7%89%88%E9%99%90%E5%AE%9A%E7%89%B9%E5%85%B8%E4%BB%98%E3%81%8D%E3%80%91-HJ%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9-%E3%81%BE%E3%81%8D%E3%81%97%E3%81%BE%E9%88%B4%E6%9C%A8-ebook/dp/B07S73F63G/ref=sr_1_2?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=%E6%97%A5%E6%9C%AC%E3%81%B8%E3%82%88%E3%81%86%E3%81%93%E3%81%9D%E3%82%A8%E3%83%AB%E3%83%95%E3%81%95%E3%82%93&qid=1635589202&s=digital-text&sr=1-2"
        // );
        // const html = response.data;

        // let arr = [];

        // const $ = cheerio.load(html);
        // let str = "";

        // str = $("div#bookDescription_feature_div.celwidget")
        //     .find("div")
        //     .text()
        //     .replace(/(\r\n|\n|\r)/gm, "");
        // console.log(str);
        // let book_info = {};

        // book_info["description"] = "";

        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto(
            "https://www.amazon.co.jp/%E6%97%A5%E6%9C%AC%E3%81%B8%E3%82%88%E3%81%86%E3%81%93%E3%81%9D%E3%82%A8%E3%83%AB%E3%83%95%E3%81%95%E3%82%93%E3%80%82-1%E3%80%90%E9%9B%BB%E5%AD%90%E7%89%88%E9%99%90%E5%AE%9A%E7%89%B9%E5%85%B8%E4%BB%98%E3%81%8D%E3%80%91-HJ%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9-%E3%81%BE%E3%81%8D%E3%81%97%E3%81%BE%E9%88%B4%E6%9C%A8-ebook/dp/B07S73F63G/ref=sr_1_2?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=%E6%97%A5%E6%9C%AC%E3%81%B8%E3%82%88%E3%81%86%E3%81%93%E3%81%9D%E3%82%A8%E3%83%AB%E3%83%95%E3%81%95%E3%82%93&qid=1635589202&s=digital-text&sr=1-2"
        );

        const iframeParagraph = await page.evaluate(() => {
            const iframe = document.getElementById("bookDesc_iframe");
            // grab iframe's document object
            const iframeDoc =
                iframe.contentDocument || iframe.contentWindow.document;
            console.log(iframeDoc);
            const iframeP = iframeDoc.getElementById("iframeContent");

            return iframeP.innerHTML;
        });

        console.log(iframeParagraph);
        // prints "This is a paragraph"

        await browser.close();

        return iframeParagraph;
    } catch (e) {
        return e;
    }
};
