<script lang="ts">
    import { getContext, onDestroy, onMount } from "svelte";
    import { Context, type CanvasContext, type Vector2 } from "./types.js";

    type LineProps = {
        start: Vector2,
        end: Vector2,
        width?: number,
    };

    let {
        start,
        end,
        width = 1
    }: LineProps = $props();

    const canvasContext: CanvasContext = getContext(Context.Canvas);

    onMount(() => {
        canvasContext.addDrawFunction(draw);
    });

    onDestroy(() => {
        canvasContext.removeDrawFunction(draw);
    });

    function draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.lineWidth = width;
        ctx.stroke();
    }
</script>