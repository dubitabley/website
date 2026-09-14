<script lang="ts">
    import {
        getGraphContext,
        type GraphInfo,
        type GraphObject,
    } from "./graph-types";

    let graphContext = getGraphContext();

    type Props = {
        /**
         * Coefficients of the polynomial, in order going up.
         * e.g. [2, -5, 6] would be equal to 6x^2-5x+2
         */
        coefficients: number[];
    };

    let { coefficients }: Props = $props();

    function calculateValue(x: number): number {
        let value = 0;
        for (let i = 0; i < coefficients.length; i++) {
            const coefficient = coefficients[i];
            value += coefficient * x ** i;
        }
        return value;
    }

    class GraphPolynomialLine implements GraphObject {
        draw(ctx: CanvasRenderingContext2D, graphInfo: GraphInfo): void {
            ctx.beginPath();
            for (
                let x = graphInfo.dims.left;
                x <= graphInfo.dims.right;
                x += 0.2
            ) {
                const y = -calculateValue(x);
                if (x === graphInfo.dims.left) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
    }

    graphContext.addObject(new GraphPolynomialLine());
</script>
