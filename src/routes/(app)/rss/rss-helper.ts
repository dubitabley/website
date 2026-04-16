export type Rss = {
    channels: Channel[];
};

export function stringifyRss(rss: Rss): string {
    return (
        `<rss version="2.0">` +
        rss.channels.map((channel) => stringifyChannel(channel)).join("") +
        `</rss>`
    );
}

export type Channel = {
    title: string;
    link: string;
    description: string;
    language: string;
    items: Item[];
};

function stringifyChannel(channel: Channel): string {
    return (
        `<channel>` +
        stringifyProperty(channel, "title") +
        stringifyProperty(channel, "link") +
        stringifyProperty(channel, "description") +
        stringifyProperty(channel, "language") +
        channel.items.map((item) => stringifyItem(item)).join("") +
        `</channel>`
    );
}

export type Item = {
    title: string;
    link: string;
    description: string;
    pubDate?: string;
};

function stringifyItem(item: Item): string {
    return (
        `<item>` +
        stringifyProperty(item, "title") +
        stringifyProperty(item, "link") +
        stringifyProperty(item, "description") +
        (item.pubDate ? stringifyProperty(item, "pubDate") : "") +
        `</item>`
    );
}

function stringifyProperty<Type, Prop extends keyof Type & string>(
    elem: Type,
    prop: Prop,
): string {
    return `<${prop}>${elem[prop]}</${prop}>`;
}
