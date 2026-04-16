import { stringifyRss, type Channel, type Item, type Rss } from "./rss-helper";
import Posts from "$lib/interests/posts.json";
import Books from "$lib/interests/books.json";
import Poems from "$lib/interests/poems.json";

const domain = "https://dubitable.xyz";

export const prerender = true;

export function GET(): Response {
    const postItems: Item[] = Posts.posts.map((post) => {
        return {
            title: post.name,
            link: `${domain}/posts/${post.link}`,
            description: post.summary,
            pubDate: post.date,
        };
    });
    const postsChannel: Channel = {
        title: "Posts",
        link: `${domain}/posts`,
        description: "Posts by me (dubitable)",
        language: "en-nz",
        items: postItems,
    };

    const bookItems: Item[] = Books.books
        .filter((book) => book.link && book.date)
        .map((book) => {
            return {
                title: book.book_name,
                description: `My review of the book ${book.book_name}`,
                link: `${domain}/interests/book/${book.link}`,
                pubDate: book.date,
            };
        });

    const booksChannel: Channel = {
        title: "Book Reviews",
        link: `${domain}/books`,
        description: "Book reviews by me (dubitable)",
        language: "en-nz",
        items: bookItems,
    };

    const poemsItems: Item[] = Poems.poems.map((poem) => {
        return {
            title: poem.name,
            description: `A ramble about the poem ${poem.name}`,
            link: `${domain}/poems/${poem.link}`,
            pubDate: poem.date,
        };
    });

    const poemsChannel: Channel = {
        title: "Poetry Rambles",
        link: `${domain}/poems`,
        description: "Poetry reviews/discussions by me (dubitable)",
        language: "en-nz",
        items: poemsItems,
    };

    const allChannel: Channel = {
        title: "Everything dubitable",
        link: domain,
        description: "All my feeds combined",
        language: "en-nz",
        items: [postItems, bookItems, poemsItems].flatMap((x) => x),
    };

    const rss: Rss = {
        channels: [postsChannel, booksChannel, poemsChannel, allChannel],
    };

    const rssText = stringifyRss(rss);

    return new Response(rssText, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
