<script lang="ts">
    import { getGraphContext, type GraphObject } from "./graph-types";

    let graphContext = getGraphContext();

    type Props = {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    };

    let { x1, y1, x2, y2 }: Props = $props();

    class GraphLine implements GraphObject {
        draw(ctx: CanvasRenderingContext2D, size: number): void {
            ctx.beginPath();
            ctx.moveTo(x1, -y1);
            ctx.lineTo(x2, -y2);
            ctx.stroke();
        }
    }

    graphContext.addObject(new GraphLine());
</script>
