<script lang="ts">
    import { getContext, onDestroy, onMount } from "svelte";
    import { Context, type CanvasContext, type GameContext, type GameParams, type PhysicsContext, type Vector2 } from "./types.js";

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

    let rotation = $state(0);

    let image: HTMLImageElement | null = null;

    const gameContext: GameContext = getContext(Context.Game);
    const physicsContext: PhysicsContext = getContext(Context.Physics);

    gameContext.addGameLoopFunction((params: GameParams) => {
        rotation -= params.deltaTime * physicsContext.velocity.x;
    });

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
        ctx.save();
        if (imagePath && image != null && image.complete) {
            ctx.translate(position.x, position.y);
            ctx.rotate(rotation);
            ctx.drawImage(image, -radius, -radius, radius * 2, radius * 2);
        } else {
            ctx.beginPath();
            ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
            ctx.lineWidth = 4;
            ctx.stroke();
        }
        ctx.restore();
    }
</script>