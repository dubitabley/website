<script lang="ts">
    import { radiansToDegrees } from "$lib/components/frog/util/angle";
    import SimpleMaths from "$lib/components/maths/equation/simple-maths.svelte";
    import InteractiveSvg from "$lib/components/maths/svg-anim/interactive-svg.svelte";
    import { generateAnglePath } from "$lib/components/svg/utils";
    import InteractivePoint from "./interactive-point.svelte";

    const SIZE = 100;

    let pointA: [number, number] = $state([SIZE / 2, SIZE / 3]);
    let pointB: [number, number] = $state([SIZE / 3, (2 * SIZE) / 3]);
    let pointC: [number, number] = $state([(2 * SIZE) / 3, (2 * SIZE) / 3]);

    let trianglePath = $derived.by(() => {
        let path = `M ${pointA[0]} ${pointA[1]} `;
        path += `L ${pointB[0]} ${pointB[1]}`;
        path += `L ${pointC[0]} ${pointC[1]} Z`;
        return path;
    });

    // returns the start angle (anticlockwise) and angle size
    function getAngleInfo(
        mainPoint: [number, number],
        point1: [number, number],
        point2: [number, number],
    ): [number, number] {
        // get angle from main to 1 and 2
        let angle1 = Math.atan2(
            mainPoint[1] - point1[1],
            mainPoint[0] - point1[0],
        );
        let angle2 = Math.atan2(
            mainPoint[1] - point2[1],
            mainPoint[0] - point2[0],
        );

        while (angle2 - angle1 > Math.PI) {
            angle2 -= 2 * Math.PI;
        }
        while (angle1 - angle2 > Math.PI) {
            angle1 -= 2 * Math.PI;
        }

        // the greater angle is further anticlockwise
        const [startAngle, angleSize] =
            angle1 < angle2
                ? [angle1, angle2 - angle1]
                : [angle2, angle1 - angle2];
        return [Math.PI + startAngle, angleSize];
    }

    let [pointAStart, pointASize] = $derived(
        getAngleInfo(pointA, pointB, pointC),
    );
    let [pointBStart, pointBSize] = $derived(
        getAngleInfo(pointB, pointA, pointC),
    );
    let [pointCStart, pointCSize] = $derived(
        getAngleInfo(pointC, pointB, pointA),
    );

    let pointAAnglePath = $derived(
        generateAnglePath(pointA, pointAStart, pointASize),
    );
    let pointBAnglePath = $derived(
        generateAnglePath(pointB, pointBStart, pointBSize),
    );
    let pointCAnglePath = $derived(
        generateAnglePath(pointC, pointCStart, pointCSize),
    );

    let aAngle = $derived(pointASize);
    let bAngle = $derived(pointBSize);
    let cAngle = $derived(pointCSize);

    let aOppositeSideLength = $derived(
        Math.hypot(pointC[1] - pointB[1], pointC[0] - pointB[0]),
    );
    let bOppositeSideLength = $derived(
        Math.hypot(pointC[1] - pointA[1], pointC[0] - pointA[0]),
    );
    let cOppositeSideLength = $derived(
        Math.hypot(pointA[1] - pointB[1], pointA[0] - pointB[0]),
    );

    let aValue = $derived(aOppositeSideLength / Math.sin(aAngle));
    let bValue = $derived(bOppositeSideLength / Math.sin(bAngle));
    let cValue = $derived(cOppositeSideLength / Math.sin(cAngle));
</script>

<div class="wrapper">
    <InteractiveSvg sizeX={SIZE} sizeY={SIZE}>
        <path d={trianglePath} />
        <path d={pointAAnglePath} />
        <path d={pointBAnglePath} />
        <path d={pointCAnglePath} />
        <InteractivePoint label="A" bind:x={pointA[0]} bind:y={pointA[1]} />
        <InteractivePoint label="B" bind:x={pointB[0]} bind:y={pointB[1]} />
        <InteractivePoint label="C" bind:x={pointC[0]} bind:y={pointC[1]} />
    </InteractiveSvg>
    <div>
        &Delta;BAC={radiansToDegrees(aAngle).toFixed(2)}&deg;, <SimpleMaths
            equation="[BC]/([sin](BAC))={aValue.toFixed(2)}"
        />
    </div>
    <div>
        &Delta;ABC={radiansToDegrees(bAngle).toFixed(2)}&deg;, <SimpleMaths
            equation="[AC]/([sin](ABC))={bValue.toFixed(2)}"
        />
    </div>
    <div>
        &Delta;ACB={radiansToDegrees(cAngle).toFixed(2)}&deg;, <SimpleMaths
            equation="[AB]/([sin](ACB))={cValue.toFixed(2)}"
        />
    </div>
</div>

<style>
    .wrapper {
        height: 100%;
        flex-grow: 1;
    }
</style>
