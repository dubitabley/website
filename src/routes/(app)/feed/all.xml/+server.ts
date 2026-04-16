import { _getBookItems } from "../books.xml/+server";
import { _getPoemItems } from "../poems.xml/+server";
import { _getPostItems } from "../posts.xml/+server";
import { domain } from "../rss-helper";
import { stringifyRss, type Channel, type Rss } from "../rss-helper";

export const prerender = true;

export function GET(): Response {
    const postItems = _getPostItems();
    const bookItems = _getBookItems();
    const poemsItems = _getPoemItems();

    const allChannel: Channel = {
        title: "Everything dubitable",
        link: domain,
        description: "All my feeds combined",
        language: "en-nz",
        items: [postItems, bookItems, poemsItems].flatMap((x) => x),
    };

    const rss: Rss = {
        channel: allChannel,
    };

    const rssText = stringifyRss(rss);

    return new Response(rssText, {
        headers: {
            "Content-Type": "application/rss+xml",
        },
    });
}
