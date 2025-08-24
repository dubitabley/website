<script lang="ts">
    import { onDestroy, onMount, setContext, type Snippet } from "svelte";
    import { CANVAS_HEIGHT, CANVAS_WIDTH, Context, type CanvasContext, type ClickEvent, type DrawFn, type Vector2 } from "./types.js";

    type DubiCanvasProps = {
        children: Snippet,
        onClick: ((event: ClickEvent) => void) | null,
        offset?: Vector2,
    }

    let {
        children,
        onClick = null,
        offset: canvasOffset = {
            x: 0,
            y: 500,
        }
    }: DubiCanvasProps = $props();

    let canvasElement: HTMLCanvasElement;
    const drawFunctions: Array<DrawFn> = [];
    const hudDrawFunctions: Array<DrawFn> = [];
    let animationFrameId: number | null = null;

    const canvasContext: CanvasContext = {
        addDrawFunction: (fn: DrawFn) => {
            drawFunctions.push(fn);
        },
        removeDrawFunction: (fn: DrawFn) => {
            const index = drawFunctions.indexOf(fn);
            if (index >= 0) {
                drawFunctions.splice(index, 1);
            }
        },
        addHudDrawFunction: (fn: DrawFn) => {
            hudDrawFunctions.push(fn);
        },
        removeHudDrawFunction: (fn: DrawFn) => {
            const index = hudDrawFunctions.indexOf(fn);
            if (index >= 0) {
                hudDrawFunctions.splice(index, 1);
            }
        },
    }

    setContext(Context.Canvas, canvasContext);

    onMount(() => {
        canvasElement.width = CANVAS_WIDTH;
        canvasElement.height = CANVAS_HEIGHT;
        const ctx = canvasElement.getContext("2d")!;
        onResize();
        drawCanvas(ctx);
        
        animationFrameId = requestAnimationFrame(() => drawCanvas(ctx));
    });

    onDestroy(() => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });

    function canvasClick(e: MouseEvent) {
        if (onClick) {
            let clickEvent = {
                position: {
                    x: -canvasOffset.x + e.offsetX,
                    y: canvasOffset.y - e.offsetY,
                }
            };
            onClick(clickEvent);
        }
    }

    function onResize() {
        const canvasBox = canvasElement.getBoundingClientRect();
        // canvasElement.width = canvasBox.width;
        // canvasElement.height = canvasBox.height;
    }

    function drawCanvas(ctx: CanvasRenderingContext2D) {
        const identityMatrix = new DOMMatrix();
        let reflectMatrix = new DOMMatrix();
        reflectMatrix = reflectMatrix.translate(canvasOffset.x, canvasOffset.y);
        reflectMatrix = reflectMatrix.flipY();

        ctx.setTransform(identityMatrix); 
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        for (const drawFunction of hudDrawFunctions) {
            drawFunction(ctx);
        }
        ctx.setTransform(reflectMatrix);
        for (const drawFunction of drawFunctions) {
            drawFunction(ctx);
        }
        animationFrameId = requestAnimationFrame(() => drawCanvas(ctx));
    }
</script>

<style>
    canvas {
        width: 100%;
        height: 100%;
    }
</style>

<canvas onmousedown={canvasClick} onresize={onResize} bind:this={canvasElement}></canvas>
{@render children()}