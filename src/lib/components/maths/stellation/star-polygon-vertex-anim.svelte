<!--
    @component
    For demonstrating polygon stellation by connecting alternate vertices of a pentagon
 -->
<script lang="ts">
    import { createCirclePoint } from "$lib/components/maths/stellation/utils";
    import PathDrawAnim from "$lib/components/maths/svg-anim/path-draw-anim.svelte";
    import SvgAnim from "$lib/components/maths/svg-anim/svg-anim.svelte";

    const TOTAL_SIZE = 100;

    type Props = {
        numPoints: number;
        vertexGap?: number;
        title?: string;
    };

    let {
        numPoints,
        vertexGap = 2,
        title = "Alternating vertices",
    }: Props = $props();

    const radius = TOTAL_SIZE / 2 - 2;

    const points: [number, number][] = $derived.by(() => {
        const points: [number, number][] = [];
        for (let i = 0; i < numPoints; i++) {
            points.push(
                createCirclePoint(radius, i / numPoints, TOTAL_SIZE / 2),
            );
        }
        return points;
    });
    const lines: string[] = $derived.by(() => {
        const lines: string[] = [];
        for (let i = 0; i < numPoints; i++) {
            const point1 = createCirclePoint(
                radius,
                i / numPoints,
                TOTAL_SIZE / 2,
            );
            const point2 = createCirclePoint(
                radius,
                (i + vertexGap) / numPoints,
                TOTAL_SIZE / 2,
            );
            lines.push(
                `M ${point1[0]},${point1[1]} L ${point2[0]},${point2[1]}`,
            );
        }
        return lines;
    });
</script>

<SvgAnim size={TOTAL_SIZE} {title}>
    {#each points as point}
        <circle cx={point[0]} cy={point[1]} r="2" />
    {/each}
    {#each lines as line, i}
        <PathDrawAnim path={line} order={i} />
    {/each}
</SvgAnim>

<style>
    circle {
        stroke: none;
        fill: light-dark(black, white);
    }
</style>
