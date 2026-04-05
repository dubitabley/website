<script lang="ts">
    import favicon from "$lib/assets/favicon.svg?no-inline";
    import "./global.css";
    import Header from "./header.svelte";

    let { children } = $props();
</script>

<svelte:head>
    <title>dubitable</title>
    <link rel="icon" href={favicon} type="svg/xml" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://dubitable.xyz/" />
    <meta property="og:title" content="dubitable's website" />
    <meta property="og:description" content="hi discord!" />
    <meta property="og:image" content="https://i.redd.it/tart0f3h1ewd1.jpg" />
</svelte:head>

<span class="header">
    <Header />
</span>

<div class="main-wrapper">
    <div class="main">
        {@render children?.()}
    </div>
</div>

<style>
    .main {
        margin-top: 20px;
        height: 100%;
        min-width: min(500px, 100%);
        max-width: 800px;
    }

    .main-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;

        @media (width < 800px) {
            padding-left: 30px;
            padding-right: 30px;
        }
    }
</style>
