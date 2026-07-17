<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        /** The SVG animations to run */
        children: Snippet;
        /** The size of the SVG canvas, defaults to 100 */
        sizeX?: number;
        sizeY?: number;
    };

    let { children, sizeX = 100, sizeY = 100 }: Props = $props();
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 {sizeX} {sizeY}"
    class="svg"
>
    {@render children()}
</svg>

<style>
    .svg {
        background-color: light-dark(white, black);
        stroke-width: 3px;
        stroke: light-dark(black, white);
        display: block;
        width: 100%;

        & :global(text) {
            fill: light-dark(black, white);
            stroke: none;
            text-anchor: middle;
        }

        & :global(circle),
        :global(path) {
            fill: none;
        }
    }
</style>
