export const getLabel = (label, toOriginal) => {
    if (toOriginal) {
        switch (label) {
            case "asin":
                return "ASIN";
            case "language":
                if (toOriginal === "jp") return "言語‏";
                return "Language";
            case "file_size":
                if (toOriginal === "jp") return "ファイルサイズ‏";
                return "File size";
            case "publisher":
                if (toOriginal === "jp") return "出版社‏";
                return "Publisher";
            case "publication_date":
                if (toOriginal === "jp") return "発売日‏";
                return "Publication date";
            case "text_to_speech":
                if (toOriginal === "jp")
                    return "Text-to-Speech（テキスト読み上げ機能）";
                return "Text-to-Speech‏";
            case "x_ray":
                return "X-Ray‏";
            case "word_wise":
                return "Word Wise‏";
            case "print_length":
                if (toOriginal === "jp") return "本の長さ‏";
                return "Print length";
            case "best_sellers_rank":
                if (toOriginal === "jp") return "Amazon 売れ筋ランキング‏";
                return "Best Sellers Rank";
            case "customer_reviews":
                if (toOriginal === "jp") return "カスタマーレビュー‏";
                return "Customer reviews";
            default:
                return label;
        }
    } else {
        switch (label) {
            case "ASIN":
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
    }
};
