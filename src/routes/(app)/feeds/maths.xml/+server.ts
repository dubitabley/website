import Maths from "$lib/interests/maths.json";
import {
    domain,
    stringifyRss,
    type Channel,
    type Item,
    type Rss,
} from "../rss-helper";

export const prerender = true;

export function GET(): Response {
    const mathsItems: Item[] = _getMathsItems();

    const mathsChannel: Channel = {
        title: "Maths Musings",
        link: `${domain}/maths`,
        description: "Posts about maths related topics by me (dubitable)",
        language: "en-nz",
        items: mathsItems,
    };

    const rss: Rss = {
        channel: mathsChannel,
    };

    const rssText = stringifyRss(rss);

    return new Response(rssText, {
        headers: {
            "Content-Type": "application/rss+xml",
        },
    });
}

export function _getMathsItems(): Item[] {
    return Maths.maths_posts.map((mathPost) => {
        return {
            title: mathPost.post_name,
            description: mathPost.description,
            link: `${domain}/maths/${mathPost.link}`,
            pubDate: mathPost.date,
        };
    });
}
