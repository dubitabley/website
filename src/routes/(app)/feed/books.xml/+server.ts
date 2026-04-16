import Books from "$lib/interests/books.json";
import {
    domain,
    stringifyRss,
    type Channel,
    type Item,
    type Rss,
} from "../rss-helper";

export const prerender = true;

export function GET(): Response {
    const bookItems: Item[] = _getBookItems();

    const booksChannel: Channel = {
        title: "Book Reviews",
        link: `${domain}/books`,
        description: "Book reviews by me (dubitable)",
        language: "en-nz",
        items: bookItems,
    };

    const rss: Rss = {
        channel: booksChannel,
    };

    const rssText = stringifyRss(rss);

    return new Response(rssText, {
        headers: {
            "Content-Type": "application/rss+xml",
        },
    });
}

export function _getBookItems(): Item[] {
    return Books.books
        .filter((book) => book.link && book.date)
        .map((book) => {
            return {
                title: book.book_name,
                description: `My review of the book ${book.book_name}`,
                link: `${domain}/interests/book/${book.link}`,
                pubDate: book.date,
            };
        });
}
