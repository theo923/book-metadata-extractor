// const https = require("https");
const axios = require("axios");
const cheerio = require("cheerio");

export const amazonRequest = async (url) => {
    let book_info = {};
    try {
        const response = await axios.get(url);
        // https://www.amazon.co.jp/%E6%97%A5%E6%9C%AC%E3%81%B8%E3%82%88%E3%81%86%E3%81%93%E3%81%9D%E3%82%A8%E3%83%AB%E3%83%95%E3%81%95%E3%82%93%E3%80%82-1%E3%80%90%E9%9B%BB%E5%AD%90%E7%89%88%E9%99%90%E5%AE%9A%E7%89%B9%E5%85%B8%E4%BB%98%E3%81%8D%E3%80%91-HJ%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9-%E3%81%BE%E3%81%8D%E3%81%97%E3%81%BE%E9%88%B4%E6%9C%A8-ebook/dp/B07S73F63G/ref=sr_1_2?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=%E6%97%A5%E6%9C%AC%E3%81%B8%E3%82%88%E3%81%86%E3%81%93%E3%81%9D%E3%82%A8%E3%83%AB%E3%83%95%E3%81%95%E3%82%93&qid=1635589202&s=digital-text&sr=1-2
        const html = response.data;
        const $ = cheerio.load(html);
        let image = $("div#ebooksImageBlockContainer")
            .find("img#ebooksImgBlkFront")
            .attr("src");
        if (image.includes("._") && image.includes("_.")) {
            const frontpart = image.split("._")[0];
            const endpart = image.split("_.")[1];
            image = frontpart + "." + endpart;
        }
        const title = $("div#titleblock_feature_div.celwidget")
            .find("span")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "");
        let authors = [];
        $("span.author.notFaded").each((idx, el) => {
            const author = $(el).find("a.a-link-normal").text();
            authors.push(author);
        });
        const stars = $("i.a-icon.a-icon-star")
            .attr("class")
            .split(" ")[2]
            .split("-")[2];
        // $("li.a-carousel-card.rpi-carousel-attribute-card").each((idx, el) => {
        //     const carousel_label = $(el)
        //         .find(
        //             "div.a-section.a-spacing-small.a-text-center.rpi-attribute-label>span"
        //         )
        //         .text();
        //     const carousel_value = $(el)
        //         .find("a.a-popover-trigger.a-declarative>span")
        //         .text();
        //     if (carousel_value !== "") {
        //         book_info[carousel_label] = carousel_value;
        //     }
        //     else {
        //         const carousel_value2 = $(el)
        //             .find(
        //                 "div.a-section.a-spacing-none.a-text-center.rpi-attribute-value>span"
        //             )
        //             .text();
        //         book_info[carousel_label] = carousel_value2;
        //     }
        // });
        $(
            "ul.a-unordered-list.a-nostyle.a-vertical.a-spacing-none.detail-bullet-list>li"
        ).each((idx, el) => {
            const carousel_item = $(el).find("span.a-list-item");
            const carousel_label = carousel_item
                .find("span>span")
                .text()
                .replace(/(\r\n|\n|\r)/gm, "")
                .split(":")[0];
            const carousel_value = carousel_item
                .find("span>span")
                .text()
                .replace(/(\r\n|\n|\r)/gm, "")
                .split(":")[1];
            book_info[carousel_label] = carousel_value;
        });
        book_info["image"] = image;
        book_info["stars"] = stars;
        book_info["authors"] = authors;
        book_info["title"] = title;
        book_info["description"] = await getDescription(url);
        console.log(book_info);

        return book_info;
    } catch (e) {
        return e;
    }
};

const getDescription = async (url) => {
    let chrome = {};
    let puppeteer;
    console.log(process.env.AWS_LAMBDA_FUNCTION_VERSION);
    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
        // running on the Vercel platform.
        chrome = require("chrome-aws-lambda");
        puppeteer = require("puppeteer-core");
    } else {
        // running locally.
        puppeteer = require("puppeteer");
    }

    try {
        let browser = await puppeteer.launch({
            args: [
                ...chrome.args,
                "--hide-scrollbars",
                "--disable-web-security",
            ],
            defaultViewport: chrome.defaultViewport,
            executablePath: await chrome.executablePath,
            headless: true,
            ignoreHTTPSErrors: true,
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
