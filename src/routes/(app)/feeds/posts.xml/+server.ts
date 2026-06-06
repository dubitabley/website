import {
    domain,
    stringifyRss,
    type Channel,
    type Item,
    type Rss,
} from "../rss-helper";
import Posts from "$lib/interests/posts.json";

export const prerender = true;

export function GET(): Response {
    const postItems: Item[] = _getPostItems();

    const postsChannel: Channel = {
        title: "Posts",
        link: `${domain}/posts`,
        description: "Posts by me (dubitable)",
        language: "en-nz",
        items: postItems,
    };

    const rss: Rss = {
        channel: postsChannel,
    };

    const rssText = stringifyRss(rss);

    return new Response(rssText, {
        headers: {
            "Content-Type": "application/rss+xml",
        },
    });
}

export function _getPostItems(): Item[] {
    return Posts.posts.map((post) => {
        return {
            title: post.name,
            link: `${domain}/posts/${post.link}`,
            description: post.summary,
            pubDate: post.date,
        };
    });
}
