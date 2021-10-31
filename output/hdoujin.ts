export const Hdoujin = (info, description, url) => {
    return `TITLE: 
ORIGINAL TITLE: ${info.title || ""}
AUTHOR: ${info.authors || ""}
ARTIST: 
Alternative CIRCLE: 
SCANLATOR: 
TRANSLATOR: 
PUBLISHER: ${info.publisher || ""}
DESCRIPTION: asin:${info.asin || ""} summary:${description || ""}
STATUS: 
CHAPTERS: 
PAGES: ${info.print_length || ""}
TAGS: ${info.best_sellers_rank || ""} ${info.stars || ""}star
TYPE: 
LANGUAGE: ${info.language || ""}
RELEASED: ${info.publication_date || ""}
READING DIRECTION: 
CHARACTERS: 
SERIES: 
PARODY: 
URL: ${url || ""}`;
};
