<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import "./global.css";
    import Header from "./header.svelte";

    let { children } = $props();

    const changingFavicon = false;
    const faviconText = "dubitable";

    let currentCharIndex = $state(0);
    let currentChar = $derived(faviconText[currentCharIndex]);
    let currentCharFavicon = $derived(
        `/favicon-dynamic/favicon_${currentChar}.png`,
    );

    if (changingFavicon) {
        setInterval(() => {
            currentCharIndex += 1;
            if (currentCharIndex >= faviconText.length) {
                currentCharIndex = 0;
            }
        }, 300);
    }
</script>

<svelte:head>
    <title>dubitable</title>
    {#if changingFavicon}
        <link rel="icon" href={currentCharFavicon} />
    {:else}
        <link rel="icon" href={favicon} />
    {/if}
</svelte:head>

<span class="header-class">
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
        max-width: 1000px;
    }

    .main-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>
