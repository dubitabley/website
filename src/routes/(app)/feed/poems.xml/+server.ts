import {
    domain,
    stringifyRss,
    type Channel,
    type Item,
    type Rss,
} from "../rss-helper";
import Poems from "$lib/interests/poems.json";

export const prerender = true;

export function GET(): Response {
    const poemsItems = _getPoemItems();

    const poemsChannel: Channel = {
        title: "Poetry Rambles",
        link: `${domain}/poems`,
        description: "Poetry reviews/discussions by me (dubitable)",
        language: "en-nz",
        items: poemsItems,
    };

    const rss: Rss = {
        channel: poemsChannel,
    };

    const rssText = stringifyRss(rss);

    return new Response(rssText, {
        headers: {
            "Content-Type": "application/rss+xml",
        },
    });
}

export function _getPoemItems(): Item[] {
    return Poems.poems.map((poem) => {
        return {
            title: poem.name,
            description: `A ramble about the poem ${poem.name}`,
            link: `${domain}/poems/${poem.link}`,
            pubDate: poem.date,
        };
    });
}
