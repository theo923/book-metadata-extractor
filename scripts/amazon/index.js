// const https = require("https");
const axios = require("axios");
const cheerio = require("cheerio");

export const amazonRequest = async (url) => {
    let book_info = {};
    try {
        const response = await axios.get(url);
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
            book_info[getFormattedLabel(carousel_label)] = carousel_value;
        });
        book_info["image"] = image;
        book_info["stars"] = stars;
        book_info["authors"] = authors;
        book_info["title"] = title;
        let description;
        let attempt = 0;
        do {
            description = await getDescription(url);
            attempt++;
        } while (description == null || !description || attempt >= 3);
        book_info["description"] = description;

        return book_info;
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

const getFormattedLabel = (label) => {
    switch (label) {
        case "ASIN‏":
            return "asin";
        case "Language":
        case "言語‏":
            return "language";
        case "File size":
        case "ファイルサイズ‏":
            return "file_size";
        case "Publisher":
        case "出版社‏":
            return "publisher";
        case "Publication date":
        case "発売日‏":
            return "publication_date";
        case "Text-to-Speech":
        case "Text-to-Speech（テキスト読み上げ機能）‏":
            return "text_to_speech";
        case "X-Ray‏":
            return "x_ray";
        case "Word Wise‏":
            return "word_wise";
        case "Print length":
        case "本の長さ‏":
            return "print_length";
        case "Best Sellers Rank":
        case "Amazon 売れ筋ランキング":
            return "best_sellers_rank";
        case "Customer reviews":
        case "カスタマーレビュー":
            return "customer_reviews";
        default:
            return label;
    }
};
