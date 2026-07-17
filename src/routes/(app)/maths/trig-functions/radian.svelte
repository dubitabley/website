<script>
    import { lerp } from "$lib/components/frog/util/numbers";
    import SvgBase from "$lib/components/maths/svg-anim/svg-base.svelte";

    const RADIUS = 80;
    const OFFSET_X = 10;
    const OFFSET_Y = 90;

    const point1X = Math.cos(0) * RADIUS + OFFSET_X;
    const point1Y = Math.sin(0) * RADIUS + OFFSET_Y;
    const point2X = Math.cos(-1) * RADIUS + OFFSET_X;
    const point2Y = Math.sin(-1) * RADIUS + OFFSET_Y;

    const angle1X = lerp(OFFSET_X, point1X, 0.2);
    const angle1Y = lerp(OFFSET_Y, point1Y, 0.2);
    const angle2X = lerp(OFFSET_X, point2X, 0.2);
    const angle2Y = lerp(OFFSET_Y, point2Y, 0.2);

    const anglePath = $derived.by(() => {
        let path = `M ${angle1X},${angle1Y} `;
        path += `S ${angle1X + 8} ${angle1Y - 12} ${angle2X} ${angle2Y}`;
        return path;
    });
</script>

<div class="radian">
    <SvgBase>
        <circle r={RADIUS} cx={OFFSET_X} cy={OFFSET_Y} />
        <line x1={OFFSET_X} y1={OFFSET_Y} x2={point1X} y2={point1Y} />
        <line x1={OFFSET_X} y1={OFFSET_Y} x2={point2X} y2={point2Y} />
        <path d={anglePath} />
        <text class="angle-text" x={OFFSET_X + 23} y={OFFSET_Y - 8}>1</text>
        <text x={OFFSET_X + RADIUS / 2} y={OFFSET_Y - 4}>r</text>
        <text x={OFFSET_X + RADIUS / 3 - 10} y={OFFSET_Y - 40}>r</text>
        <text x={OFFSET_X + RADIUS} y={OFFSET_Y - 35}>r</text>
    </SvgBase>
</div>

<style>
    .radian {
        max-width: 300px;
    }

    text {
        text-anchor: middle;
        font-size: 1.5em;
        fill: light-dark();
    }

    .angle-text {
        font-size: 0.8em;
    }
</style>
