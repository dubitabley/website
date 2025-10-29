<script lang="ts">
    import type { PageProps } from "./$types";
    import ClipMask, {
        circle,
        rect,
    } from "$lib/components/frog/clip-mask.svelte";
    import Frog from "$lib/components/frog/frog.svelte";
    import { onMount, type Snippet } from "svelte";

    let { data }: PageProps = $props();

    let rectClipObjects: [Snippet<[any]>, any][] = $state([]);

    onMount(() => {
        rectClipObjects.push([circle, { cx: 200, cy: 200, r: 100 }]);
        rectClipObjects.push([
            rect,
            { x: 500, y: 100, width: 75, height: 100 },
        ]);
    });
</script>

<Frog />

<ClipMask clipSnippets={rectClipObjects}>
    <div class="background">
        <div class="first-block">test</div>
    </div>
</ClipMask>

<style>
    .first-block {
        padding: 10px;
        display: inline-block;
        color: white;
        border: 2px solid white;
        border-radius: 100px;
    }

    @property --offset {
        syntax: "<length>";
        initial-value: 0px;
        inherits: false;
    }

    .background {
        min-width: 100vw;
        min-height: 100vh;
        background-color: seagreen;
    }

    :global(html) {
        background:
            repeating-linear-gradient(
                120deg,
                rgb(0, 0, 100, 0.5) 0px,
                rgb(0, 0, 255, 0.5) 50px,
                rgb(0, 0, 100, 0.5) 100px
            ),
            repeating-linear-gradient(
                240deg,
                rgb(0, 0, 100, 0.5) 0px,
                rgb(0, 0, 255, 0.5) 50px,
                rgb(0, 0, 100, 0.5) 100px
            ),
            repeating-linear-gradient(
                0deg,
                rgb(0, 0, 10, 0.5) var(--offset),
                rgb(0, 0, 255, 0.2) calc(var(--offset) + 50px),
                rgb(0, 0, 10, 0.5) calc(var(--offset) + 100px)
            ),
            repeating-radial-gradient(
                rgb(0, 0, 200, 0.5) 0px,
                rgb(0, 0, 200, 0.5) 20px
            );
        animation-name: background-offset;
        animation-duration: 5s;
        animation-iteration-count: infinite;
    }

    @keyframes background-offset {
        0% {
            --offset: 0px;
        }

        50% {
            --offset: 50px;
        }

        100% {
            --offset: 0px;
        }
    }

    :global(html, body) {
        margin: 0;
        padding: 0;
    }

    :global(*) {
        box-sizing: border-box;
    }
</style>
