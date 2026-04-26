<script lang="ts">
    import { getGraphContext, type GraphObject } from "./graph-types";

    let graphContext = getGraphContext();

    type Props = {
        x: number;
        y: number;
        radius?: number;
    };

    let { x, y, radius = 6 }: Props = $props();

    class Point implements GraphObject {
        draw(ctx: CanvasRenderingContext2D, size: number): void {
            ctx.beginPath();
            ctx.arc(x, -y, 0.03 * size * radius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    graphContext.addObject(new Point());
</script>
