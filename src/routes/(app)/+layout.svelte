<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import "./global.css";
    import Header from "./header.svelte";

    let { children } = $props();
</script>

<svelte:head>
    <title>dubitable</title>
    <link rel="icon" href={favicon} />
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
