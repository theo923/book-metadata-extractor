export const Hdoujin = (info, structuredData) => {
    return `TITLE: 
ORIGINAL TITLE: ${info.title || ""}
AUTHOR: ${info.authors.map((author) => `"${author}"`) || ""}
ARTIST: 
Alternative CIRCLE: 
SCANLATOR: 
TRANSLATOR: 
PUBLISHER: ${info.publisher || ""}
DESCRIPTION: ${info.asin || info.isbn || ""} summary:${
        structuredData?.description || ""
    }
STATUS: 
CHAPTERS: 
PAGES: ${info.print_length || ""}
TAGS: ${
        (info.best_sellers_rank &&
            "best_sellers_rank:" + info.best_sellers_rank + ",") ||
        ""
    } ${(info.stars && info.stars + "star,") || ""} ${
        (info.language && "language:" + info.language) + "," || ""
    } ${
        (info.asin && "asin:" + info.asin + ",") ||
        (info.isbn && "isbn:" + info.asin + ",") ||
        ""
    } ${(info.publisher && "publisher:" + info.publisher + ",") || ""}
    ${
        structuredData?.tagData
            ? structuredData.tagData.map((tag) => ` ${tag}`)
            : null
    }
TYPE: 
LANGUAGE: ${info.language || ""}
RELEASED: ${info.publication_date || ""}
READING DIRECTION: 
CHARACTERS: 
SERIES: 
PARODY: 
URL: ${structuredData?.url || ""}`;
};
