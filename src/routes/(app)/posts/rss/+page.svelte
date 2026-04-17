<script lang="ts">
    import { getRandomValueInArray } from "$lib/components/frog/util/random";
    import { onMount } from "svelte";

    const rAdjectives = [
        "Rare",
        "Rosy",
        "Rapid",
        "Rusty",
        "Rigid",
        "Risky",
        "Refreshing",
        "Robotic",
    ];
    const sAdjectives = [
        "Sad",
        "Sane",
        "Spicy",
        "Sacred",
        "Serene",
        "Shrewd",
        "Smart",
        "Sweaty",
        "Stellar",
    ];
    const sNouns = [
        "Sass",
        "Savant",
        "Sailor",
        "Saint",
        "Siege",
        "Sickle",
        "Squirrel",
        "Subway",
    ];

    let word1: string = $state("");
    let word2: string = $state("");
    let word3: string = $state("");

    onMount(() => {
        word1 = getRandomValueInArray(rAdjectives);
        word2 = getRandomValueInArray(sAdjectives);
        word3 = getRandomValueInArray(sNouns);
    });
</script>

<h1>RSS</h1>

<p>
    I've been using an RSS reader app so I decided that I really ought to setup
    an RSS feed for my website. Plus it would be fun to setup.
</p>

<h3>What is RSS?</h3>
<p>
    RSS stands for <span
        title="This is just a little joke, it's actually Really Simple Syndication"
        >{word1} {word2} {word3}</span
    > and is a standard way of publishing content such that someone can get updates
    when it changes without having to check the webpage all the time. It's a lot like
    following someone on social media.
</p>
<h3>Technical Info</h3>
<p>
    The RSS specification which I followed is <a
        href="https://www.rssboard.org/rss-specification"
        >the RSS Advisory Board's spec.</a
    > I wanted to use an XML serialiser but there weren't any built-in ones and I
    try to avoid having dependencies if I can avoid it so I just do it manually.
</p>
<p>I have a bunch of different feeds:</p>
<ul>
    <li><a href="/feed/all.xml">RSS Feed for everything</a></li>
    <li><a href="/feed/posts.xml">RSS Feed for weblog posts</a></li>
    <li><a href="/feed/maths.xml">RSS Feed for maths related posts</a></li>
    <li><a href="/feed/books.xml">RSS Feed for book reviews</a></li>
    <li><a href="/feed/poems.xml">RSS Feed for poetry rambles</a></li>
</ul>
