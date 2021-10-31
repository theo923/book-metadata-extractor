export interface childNode {
    props?: {
        children?: React.ReactNode;
    };
    children?: React.ReactNode;
}

export interface booksProps {
    asin: string | null | undefined;
    title: string | null | undefined;
    image: string | null | undefined;
    authors: string[] | null | undefined;
    description: string | null | undefined;
    stars: string | null | undefined;
    language: string | null | undefined;
    file_size: string | null | undefined;
    publisher: string | null | undefined;
    publication_date: string | null | undefined;
    text_to_speech: string | null | undefined;
    x_ray: string | null | undefined;
    word_wise: string | null | undefined;
    print_length: string | null | undefined;
    best_sellers_rank: string | null | undefined;
    customer_reviews: string | null | undefined;
}
