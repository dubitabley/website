<script lang="ts">
    import { getContext, onDestroy, onMount } from "svelte";
    import { Context, type CanvasContext, type Vector2 } from "./types.js";

    type BallProps = {
        position: Vector2,
        radius: number,
        imagePath?: string | null
    };

    let {
        position,
        radius, 
        imagePath = null
    }: BallProps = $props();

    let image: HTMLImageElement | null = null;

    const canvasContext: CanvasContext = getContext(Context.Canvas);

    onMount(() => {
        if (imagePath != null) {
            image = new Image();
            image.src = imagePath;
        }
        canvasContext.addDrawFunction(draw);
    });

    onDestroy(() => {
        canvasContext.removeDrawFunction(draw);
    });

    function draw(ctx: CanvasRenderingContext2D) {
        if (imagePath && image != null && image.complete) {
            ctx.drawImage(image, position.x, position.y, radius * 2, radius * 2);
        } else {
            ctx.beginPath();
            ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
            ctx.lineWidth = 4;
            ctx.stroke();
        }
    }
</script>