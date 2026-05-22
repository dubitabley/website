<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();
</script>

<svelte:head>
    <script
        async
        src="https://embed.bsky.app/static/embed.js"
        charset="utf-8"
    ></script>
</svelte:head>

{@render children()}
