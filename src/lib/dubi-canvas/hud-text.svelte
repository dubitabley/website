<script lang="ts">
    import { getContext, onDestroy, onMount } from "svelte";
    import { Context, type CanvasContext } from "./types.js";

    type TextProps = {
        text: string,
        x: number,
        y: number,
        fontSize?: number,
        fontFace?: string
    };

    const {
        text,
        x,
        y,
        fontSize = 12,
        fontFace = "Verdana"
    }: TextProps = $props();

    const canvasContext: CanvasContext = getContext(Context.Canvas);

    onMount(() => {
        canvasContext.addHudDrawFunction(draw);
    });

    onDestroy(() => {
        canvasContext.removeHudDrawFunction(draw);
    });

    function draw(ctx: CanvasRenderingContext2D) {
        ctx.font = `${fontSize}px ${fontFace}`;
        ctx.fillText(text, x, y);
    }
</script>