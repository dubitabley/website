<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageProps } from './$types';
    import Duck from "./duck.svg?raw";

    let { data }: PageProps = $props();

    let canvasObject: HTMLCanvasElement;

    let duckImage: HTMLImageElement; 

    onMount(() => {
        duckImage = new Image();
        const duckSvg = document.getElementById("duck");
        const encodedSvg = new XMLSerializer().serializeToString(duckSvg!);
        duckImage.addEventListener("error", (e) => {
            console.error("error loading duck");
        });
        duckImage.src = `data:image/svg+xml; charset=utf8, ${encodeURIComponent(encodedSvg)}`;

        canvasObject.addEventListener("click", addDuck);
        const rect = canvasObject.getBoundingClientRect();
        canvasObject.width = rect.width;
        canvasObject.height = rect.height;
    });

    function addDuck(event: MouseEvent) {
        const context = canvasObject.getContext("2d")!;

        const width = (Math.random() - 0.5) * 150 + 200;
        const height = (Math.random() - 0.5) * 150 + 200;

        context.drawImage(duckImage, event.offsetX - width / 2, event.offsetY - height / 2, width, height);
    }
</script>

<style>
    .hidden {
        display: none;
    }

    canvas {
        width: 100%;
        height: 100%;
        flex-grow: 1;
    }

    .canvas-wrapper {
        display: flex;
        flex-direction: column;
    }
</style>

<div class="hidden">
    {@html Duck}
</div>

<div class="canvas-wrapper">
    <canvas bind:this={canvasObject}>
        Canvas not supported :(
    </canvas>
</div>