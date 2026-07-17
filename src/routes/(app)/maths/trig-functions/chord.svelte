<script lang="ts">
    import { radiansToDegrees } from "$lib/components/frog/util/angle";
    import { lerp } from "$lib/components/frog/util/numbers";
    import SimpleMaths from "$lib/components/maths/equation/simple-maths.svelte";
    import SvgBase from "$lib/components/maths/svg-anim/svg-base.svelte";
    import { generateSemicirclePath } from "$lib/components/svg/utils";

    const RADIUS = 45;
    const OFFSET = 5;

    const CENTRE = RADIUS + OFFSET;

    const semicirclePath = generateSemicirclePath(RADIUS, {
        offsetX: OFFSET,
        offsetY: OFFSET,
    });

    // the y position of the chord line
    let chordLineY = $state(20);
    // y distance from the centre
    let yDist = $derived(RADIUS + OFFSET - chordLineY);
    // half chord width
    let halfChordWidth = $derived(Math.sqrt(RADIUS ** 2 - yDist ** 2));
    let chordX1 = $derived(CENTRE - halfChordWidth);
    let chordX2 = $derived(CENTRE + halfChordWidth);

    let thetaAngle = $derived(Math.PI - 2 * Math.asin(yDist / RADIUS));

    let thetaSize = $derived(
        0.58 * (0.3 - Math.abs((chordLineY - CENTRE / 1.8) / CENTRE)) + 0.2,
    );

    function generateAnglePath(
        anchorPoint: [number, number],
        point1: [number, number],
        point2: [number, number],
        angle: number,
    ): string {
        const curveDist = 0.2;
        const arcPoint1 = [
            lerp(anchorPoint[0], point1[0], curveDist),
            lerp(anchorPoint[1], point1[1], curveDist),
        ];
        const arcPoint2 = [
            lerp(anchorPoint[0], point2[0], curveDist),
            lerp(anchorPoint[1], point2[1], curveDist),
        ];
        const angleDist = 10;
        const xDiff = Math.cos(angle) * angleDist;
        const yDiff = Math.sin(angle) * angleDist;
        let path = `M ${arcPoint1[0]},${arcPoint1[1]} `;
        path += `S ${anchorPoint[0] + xDiff} ${anchorPoint[1] + yDiff} ${arcPoint2[0]} ${arcPoint2[1]}`;
        return path;
    }

    let arcPath = $derived(
        generateAnglePath(
            [CENTRE, CENTRE],
            [chordX1, chordLineY],
            [chordX2, chordLineY],
            (3 * Math.PI) / 2,
        ),
    );
</script>

<div class="wrapper">
    <input
        class="vertical-range"
        type="range"
        min={OFFSET + 0.1}
        max={CENTRE - 1}
        bind:value={chordLineY}
    />
    <SvgBase sizeX={100} sizeY={60}>
        <path d={semicirclePath} fill="none" />
        <path d={arcPath} stroke-width="1" />
        <line
            stroke-width="1"
            x1={chordX1}
            y1={chordLineY}
            x2={CENTRE}
            y2={CENTRE}
            class="dotted-line"
        />
        <line
            stroke-width="1"
            x1={chordX2}
            y1={chordLineY}
            x2={CENTRE}
            y2={CENTRE}
            class="dotted-line"
        />
        <line
            stroke="green"
            stroke-width="1"
            y1={chordLineY}
            y2={chordLineY}
            x1={chordX1}
            x2={chordX2}
        />
        <text
            x={CENTRE}
            y={CENTRE - 2}
            font-size="{thetaSize}em"
            text-anchor="middle">θ</text
        >
    </SvgBase>
</div>
<div>
    <p>
        <SimpleMaths
            equation="[theta]={thetaAngle.toFixed(2)} [rad] = {radiansToDegrees(
                thetaAngle,
            ).toFixed(2)}[degrees]"
        />
    </p>
</div>

<style>
    .dotted-line {
        stroke-dasharray: 0.1em;
    }

    .wrapper {
        display: flex;
        flex-direction: row;

        & .vertical-range {
            writing-mode: vertical-lr;
        }
    }
</style>
