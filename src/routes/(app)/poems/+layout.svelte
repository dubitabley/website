<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
    };
    let { children }: Props = $props();
</script>

<svelte:head>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Beau+Rivage&display=swap");

        pre {
            font-family: "Beau Rivage", cursive;
            font-weight: 400;
            font-size: 1.8em;
            font-style: normal;
        }
    </style>
</svelte:head>

{@render children?.()}
