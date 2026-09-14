<script lang="ts">
    import {
        getGraphContext,
        type GraphInfo,
        type GraphObject,
    } from "./graph-types";

    let graphContext = getGraphContext();

    type Props = {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    };

    let { x1, y1, x2, y2 }: Props = $props();

    class GraphStraightLine implements GraphObject {
        draw(ctx: CanvasRenderingContext2D, _graphInfo: GraphInfo): void {
            ctx.beginPath();
            ctx.moveTo(x1, -y1);
            ctx.lineTo(x2, -y2);
            ctx.closePath();
            ctx.stroke();
        }
    }

    graphContext.addObject(new GraphStraightLine());
</script>
