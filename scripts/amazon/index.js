// const https = require("https");
const axios = require("axios");
const cheerio = require("cheerio");

export const amazonRequest = async (url, type) => {
    try {
        let book_info = {};
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        let image = $(pointer(type, "image0"))
            .find(pointer(type, "image1"))
            .attr("src");
        if (image.includes("._") && image.includes("_.")) {
            const frontpart = image.split("._")[0];
            const endpart = image.split("_.")[1];
            image = frontpart + "." + endpart;
        }
        const title = $(pointer(type, "title"))
            .find("span")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "");
        let authors = [];
        $(pointer(type, "authors1")).each((idx, el) => {
            const author = $(el).find(pointer(type, "authors2")).text();
            authors.push(author);
        });
        const stars = $(pointer(type, "stars"))
            .attr("class")
            .split(" ")[2]
            .split("-")[2];
        $(pointer(type, "carousel1")).each((idx, el) => {
            const carousel_item = $(el).find(pointer(type, "carousel2"));
            const carousel_label = carousel_item
                .find(pointer(type, "carousel3"))
                .text()
                .replace(/(\r\n|\n|\r)/gm, "")
                .split(":")[0];
            const carousel_value = carousel_item
                .find(pointer(type, "carousel3"))
                .text()
                .replace(/(\r\n|\n|\r)/gm, "")
                .split(":")[1];
            book_info[getFormattedLabel(carousel_label)] = carousel_value;
        });
        book_info["image"] = image;
        book_info["stars"] = stars;
        book_info["authors"] = authors;
        book_info["title"] = title;
        book_info["description"] = "";

        return book_info;
    } catch (e) {
        return e;
    }
};

const pointer = (type, id) => {
    switch (id) {
        case "image0":
            return type === "ebook"
                ? "div#ebooksImageBlockContainer"
                : "div#imageBlockContainer";
        case "image1":
            return type === "ebook"
                ? "img#ebooksImgBlkFront"
                : "img#imgBlkFront";
        case "title":
            return "div#titleblock_feature_div.celwidget";
        case "authors1":
            return "span.author.notFaded";
        case "authors2":
            return "a.a-link-normal";
        case "stars":
            return "i.a-icon.a-icon-star";
        case "carousel1":
            return "ul.a-unordered-list.a-nostyle.a-vertical.a-spacing-none.detail-bullet-list>li";
        case "carousel2":
            return "span.a-list-item";
        case "carousel3":
            return "span>span";
    }
};

const getFormattedLabel = (label) => {
    switch (label) {
        case "ISBN-10‏":
            return "isbn10";
        case "ISBN-13":
            return "isbn13";
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
