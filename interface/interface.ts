export interface childNode {
    props?: {
        children?: React.ReactNode;
    };
    children?: React.ReactNode;
}

export interface booksProps {
    asin: string;
    title: string;
    image: string;
    authors: string[];
    description: string;
    stars: string;
    language: string;
    file_size: string;
    publisher: string;
    publication_date: string;
    text_to_speech: string;
    x_ray: string;
    word_wise: string;
    print_length: string;
    best_sellers_rank: string;
    customer_reviews: string;
}
