<script lang="ts">
    import type { Snippet } from "svelte";
    import { setGraphContext, type GraphObject } from "./graph-types";
    import { SvelteSet } from "svelte/reactivity";
    import { getCurrentTheme } from "$lib/components/theming/theme";

    type Dims = {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };

    type Translation = {
        x: number;
        y: number;
    };

    type Props = {
        width?: number;
        height?: number;
        children?: Snippet;
        /** Zoom amount */
        zoom?: number;
        translate?: Translation;
        /** Specific dimensions, overrides the zoom level */
        dims?: Dims;
    };

    let {
        width = 500,
        height = 500,
        children,
        zoom,
        dims,
        translate,
    }: Props = $props();

    let zoomAmount = $derived.by(() => {
        if (dims) {
            // this overrides the raw zoom value
            // just take the maximum of the difference
            let xDiff = dims.right - dims.left;
            let yDiff = dims.top - dims.bottom;

            const diffUsed = Math.max(xDiff + yDiff) / 2;
            const averageSize = (width + height) / 2;
            if (diffUsed !== 0) {
                return averageSize / diffUsed;
            }
        }
        return zoom ?? 1;
    });
    let [translateX, translateY] = $derived.by(() => {
        if (dims) {
            // prioritise left and bottom
            // start is the position left would be without any translation
            const startX = -(width / zoomAmount) / 2;
            const startY = -(height / zoomAmount) / 2;

            return [-startX + dims.left, -startY + dims.bottom];
        }
        return [translate?.x ?? 0, translate?.y ?? 0];
    });
    let size = $derived(50 / zoomAmount);

    let canvas: HTMLCanvasElement;

    let objects: SvelteSet<GraphObject> = new SvelteSet();

    function addObject(object: GraphObject) {
        $effect(() => {
            objects.add(object);
            return () => objects.delete(object);
        });
    }

    $effect(() => {
        const ctx = canvas.getContext("2d")!;

        ctx.resetTransform();
        ctx.clearRect(0, 0, width, height);
        // translate
        doTransform(ctx);
        drawAxes(ctx);
        for (const object of objects) {
            object.draw(ctx, size);
        }
    });

    function doTransform(ctx: CanvasRenderingContext2D) {
        // centre the grid
        ctx.translate(width / 2, height / 2);
        if (zoomAmount !== 1) {
            ctx.scale(zoomAmount, zoomAmount);
        }
        // do translation after scaling
        ctx.translate(-translateX, translateY);
    }

    function drawAxes(ctx: CanvasRenderingContext2D) {
        const colours = getCurrentTheme();
        ctx.fillStyle = colours.primaryColour;
        ctx.strokeStyle = colours.primaryColour;
        ctx.lineWidth = 0.02 * size;

        // main lines
        ctx.beginPath();
        ctx.moveTo(0, -10000);
        ctx.lineTo(0, 10000);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-10000, 0);
        ctx.lineTo(10000, 0);
        ctx.stroke();

        // notch lines and markings
        const intervalDist = size;
        ctx.font = `${size * 0.25}px sans-serif`;
        const maxX = width;
        for (let x = -maxX / 2; x <= maxX / 2; x += intervalDist) {
            if (x === 0) {
                ctx.fillText("0", size * 0.2, -size * 0.4);
                continue;
            }
            ctx.beginPath();
            ctx.moveTo(x, -size * 0.2);
            ctx.lineTo(x, size * 0.2);
            ctx.stroke();

            const xString = formatAxisNum(x);
            const textDims = ctx.measureText(xString);
            ctx.fillText(xString, x - textDims.width / 2, -size * 0.3);
        }
        const maxY = height;
        for (let y = -maxY / 2; y <= maxY / 2; y += intervalDist) {
            if (y === 0) {
                continue;
            }
            ctx.beginPath();
            ctx.moveTo(-size * 0.2, y);
            ctx.lineTo(size * 0.2, y);
            ctx.stroke();

            const yString = formatAxisNum(-y);
            const textDims = ctx.measureText(yString);
            const textHeight =
                textDims.actualBoundingBoxAscent +
                textDims.actualBoundingBoxDescent;
            ctx.fillText(yString, size * 0.3, y + textHeight / 2);
        }
    }

    function formatAxisNum(num: number): string {
        return num.toLocaleString("en-nz", {
            useGrouping: false,
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
        });
    }

    setGraphContext({ addObject });
</script>

<canvas bind:this={canvas} {width} {height}>
    {@render children?.()}
</canvas>

<style>
    /*canvas {
        width: 100%;
        height: 100%;
    }*/

    canvas {
        border: 5px double var(--primary-color-2);
    }
</style>
