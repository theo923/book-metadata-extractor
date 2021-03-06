export const Koromo = (info) => {
    return `{
  "Id": "0",
  "Title": "${info.title || "null"}",
  "Artists": [
    ${info.authors.map((author) => `"${author}" `) || ""}
  ],
  "Groups":  "${info.publisher || "null"}",
  "Series": [
    "N/A"
  ],
  "Characters": null,
  "Types": null,
  "Pages": ${info.print_length || "null"},
  "Tags": [
    "${info.asin || info.isbn || ""}",
    "${info.stars || ""}star",
    "${info.language || ""}"
  ]
}`;
};
