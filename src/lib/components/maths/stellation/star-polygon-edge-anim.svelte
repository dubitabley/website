<!--
    @component
    For demonstrating polygon stellation by extending edges of a polygon
 -->

<script lang="ts">
    import { lerp } from "$lib/components/frog/util/numbers";
    import {
        addLengthToPoint,
        createCirclePoint,
        getEdgeLength,
        getGradientIntersection,
        getInternalAngle,
        getIntersectionPoint,
    } from "$lib/components/maths/stellation/utils";
    import type { PathFunction } from "$lib/components/maths/svg-anim/path-anim.svelte";
    import PathAnim from "$lib/components/maths/svg-anim/path-anim.svelte";
    import SvgAnim from "$lib/components/maths/svg-anim/svg-anim.svelte";

    const TOTAL_SIZE = 100;

    type Props = {
        numPoints: number;
        title?: string,
        edgeGap?: number
    };

    let { numPoints, title = "Extending Edges", edgeGap = 2 }: Props = $props();

    // the radius of the inner polygon calculated from the outer polygon
    // so it fits in the canvas
    const radius = $derived.by(() => {
        const outerRadius = TOTAL_SIZE / 2 - 2;
        const internalAngle = getInternalAngle(numPoints);
        // triangle - there's probably a cleaner way of doing this...
        const centreAngle = ((edgeGap - 1) / 2) * 2 * Math.PI / numPoints;
        const otherAngle = Math.PI - internalAngle / 2;
        const pointAngle = Math.PI - centreAngle - otherAngle;
        // a/sin(A) = b/sin(B)
        const radius = outerRadius * Math.sin(pointAngle) / Math.sin(otherAngle);
        return radius;
    });

    function generatePath(
        point1: [number, number],
        point2: [number, number],
        endPoint3: [number, number],
        amount: number,
    ): string {
        const point3 = [
            lerp(point2[0], endPoint3[0], amount),
            lerp(point2[1], endPoint3[1], amount),
        ];
        return `M ${point1[0]},${point1[1]} L ${point2[0]},${point2[1]} L ${point3[0]},${point3[1]}`;
    }

    const lineFunctions: [PathFunction, PathFunction][] = $derived.by(() => {
        const funcs: [PathFunction, PathFunction][] = [];
        for (let i = 0; i < numPoints; i++) {
            const line1Point1 = createCirclePoint(
                radius,
                i / numPoints,
                TOTAL_SIZE / 2,
            );
            const line1Point2 = createCirclePoint(
                radius,
                (i + 1) / numPoints,
                TOTAL_SIZE / 2,
            );
            const line2Point2 = createCirclePoint(
                radius,
                (i + edgeGap) / numPoints,
                TOTAL_SIZE / 2,
            );
            const line2Point1 = createCirclePoint(
                radius,
                (i + edgeGap + 1) / numPoints,
                TOTAL_SIZE / 2,
            );

            const line1 = getGradientIntersection(line1Point1, line1Point2);
            const line2 = getGradientIntersection(line2Point1, line2Point2);

            let endPoint;
            // need to check if gradients are the same
            if (line1[0] === line2[0]) {
                endPoint = addLengthToPoint(line1Point2, line1, radius);
            } else {
                endPoint = getIntersectionPoint(line1, line2);
            }

            funcs.push([
                (amount: number) => {
                    return generatePath(line1Point1, line1Point2, endPoint, amount);
                },
                (amount: number) => {
                    return generatePath(line2Point1, line2Point2, endPoint, amount);
                },
            ]);
        }
        return funcs;
    });
</script>

<SvgAnim size={TOTAL_SIZE} {title}>
    {#each lineFunctions as [lineFunc1, lineFunc2], i}
        <PathAnim pathFunction={lineFunc1} order={i} />
        <PathAnim pathFunction={lineFunc2} order={i} />
    {/each}
</SvgAnim>
