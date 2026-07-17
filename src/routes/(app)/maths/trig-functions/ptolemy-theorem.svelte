<script lang="ts">
    import SimpleMaths from "$lib/components/maths/equation/simple-maths.svelte";
    import InteractiveSvg from "$lib/components/maths/svg-anim/interactive-svg.svelte";
    import InteractiveCirclePoint from "./interactive-circle-point.svelte";

    const RADIUS = 50;
    const OFFSET = 5;

    const CENTRE = RADIUS + OFFSET;
    const TOTAL_SIZE = CENTRE * 2;

    let aPointAngle = $state((3 * Math.PI) / 2);
    let bPointAngle = $state(0);
    let cPointAngle = $state(Math.PI / 2);
    let dPointAngle = $state(Math.PI);

    let aPoint = $derived(pointFromAngle(aPointAngle));
    let bPoint = $derived(pointFromAngle(bPointAngle));
    let cPoint = $derived(pointFromAngle(cPointAngle));
    let dPoint = $derived(pointFromAngle(dPointAngle));

    function pointFromAngle(angle: number): [number, number] {
        return [
            Math.cos(angle) * RADIUS + CENTRE,
            Math.sin(angle) * RADIUS + CENTRE,
        ];
    }

    type Line = {
        point1: [number, number];
        label1: string;
        point2: [number, number];
        label2: string;
    };

    function getLineLabel(line: Line) {
        // order alphabetically
        const first = line.label1 < line.label2 ? line.label1 : line.label2;
        const second = line.label1 < line.label2 ? line.label2 : line.label1;
        return first + second;
    }

    function getLineLength(line: Line) {
        return Math.hypot(
            line.point2[1] - line.point1[1],
            line.point2[0] - line.point1[0],
        );
    }

    type Point = {
        angle: number;
        point: [number, number];
        label: string;
    };

    function toPoint(
        angle: number,
        point: [number, number],
        label: string,
    ): Point {
        return {
            angle,
            point,
            label,
        };
    }

    /** Clamps an angle between 0 and 2*PI */
    function clampAngle(angle: number): number {
        let angleCopy = angle;
        if (angle < 0) {
            angleCopy += 2 * Math.PI;
        }
        if (angle > 2 * Math.PI) {
            angleCopy -= 2 * Math.PI;
        }

        return angleCopy;
    }

    let quadLines: Line[] = $derived.by(() => {
        const aPointValue = toPoint(clampAngle(aPointAngle), aPoint, "A");
        const points = [
            aPointValue,
            toPoint(clampAngle(bPointAngle), bPoint, "B"),
            toPoint(clampAngle(cPointAngle), cPoint, "C"),
            toPoint(clampAngle(dPointAngle), dPoint, "D"),
        ];
        const lines: Line[] = [];
        // first line always goes from A
        let currentPoint = aPointValue;
        while (points.length > 0) {
            const nextPoint = getPointAfter(currentPoint, points);

            lines.push({
                point1: currentPoint.point,
                label1: currentPoint.label,
                point2: nextPoint.point,
                label2: nextPoint.label,
            });

            const index = points.indexOf(nextPoint);
            points.splice(index, 1);

            currentPoint = nextPoint;
        }

        return lines;
    });

    let totalLineLength = $derived(
        getLineLength(quadLines[0]) * getLineLength(quadLines[2]) +
            getLineLength(quadLines[1]) * getLineLength(quadLines[3]),
    );

    function getPointAfter(point: Point, allPoints: Point[]): Point {
        const greaterPoints = allPoints
            .filter((x) => x.label != point.label && x.angle > point.angle)
            .toSorted((a, b) => a.angle - b.angle);
        if (greaterPoints.length > 0) {
            return greaterPoints[0];
        }
        const allPointsOrdered = allPoints
            .filter((x) => x.label != point.label)
            .toSorted((a, b) => a.angle - b.angle);
        return allPointsOrdered[0];
    }

    let diagonalLines: Line[] = $derived.by(() => {
        return [
            {
                point1: quadLines[0].point1,
                label1: quadLines[0].label1,
                point2: quadLines[1].point2,
                label2: quadLines[1].label2,
            },
            {
                point1: quadLines[0].point2,
                label1: quadLines[0].label2,
                point2: quadLines[2].point2,
                label2: quadLines[2].label2,
            },
        ];
    });

    let totalDiagonalLength = $derived(
        getLineLength(diagonalLines[0]) * getLineLength(diagonalLines[1]),
    );
</script>

<div class="wrapper">
    <h2>Circle with radius 50</h2>
    <InteractiveSvg sizeX={TOTAL_SIZE} sizeY={TOTAL_SIZE}>
        <!-- main circle -->
        <circle
            r={RADIUS}
            cx={CENTRE}
            cy={CENTRE}
            stroke-width="2"
            fill="none"
        />
        <!-- lines between points -->
        {#each quadLines as quadLine}
            <line
                class="quad-line"
                x1={quadLine.point1[0]}
                y1={quadLine.point1[1]}
                x2={quadLine.point2[0]}
                y2={quadLine.point2[1]}
            />
        {/each}
        {#each diagonalLines as diagonalLine}
            <line
                class="diagonal-line"
                x1={diagonalLine.point1[0]}
                y1={diagonalLine.point1[1]}
                x2={diagonalLine.point2[0]}
                y2={diagonalLine.point2[1]}
            />
        {/each}
        <!-- points -->
        <InteractiveCirclePoint
            bind:angle={aPointAngle}
            radius={RADIUS}
            centre={CENTRE}
            label="A"
        />
        <InteractiveCirclePoint
            bind:angle={bPointAngle}
            radius={RADIUS}
            centre={CENTRE}
            label="B"
        />
        <InteractiveCirclePoint
            bind:angle={cPointAngle}
            radius={RADIUS}
            centre={CENTRE}
            label="C"
        />
        <InteractiveCirclePoint
            bind:angle={dPointAngle}
            radius={RADIUS}
            centre={CENTRE}
            label="D"
        />
    </InteractiveSvg>
    <div class="result-wrapper">
        <div class="results">
            {#each quadLines as quadLine}
                <div>
                    <span class="quad-line">Line {getLineLabel(quadLine)}</span
                    >: {getLineLength(quadLine).toFixed(2)}
                </div>
            {/each}

            <div>
                <SimpleMaths
                    equation="[{getLineLabel(quadLines[0])}]*[{getLineLabel(
                        quadLines[2],
                    )}]+[{getLineLabel(quadLines[1])}]*[{getLineLabel(
                        quadLines[3],
                    )}]={totalLineLength.toFixed(2)}"
                />
            </div>
        </div>
        <div class="results">
            {#each diagonalLines as diagonalLine}
                <div>
                    <span class="diagonal-line"
                        >Line {getLineLabel(diagonalLine)}</span
                    >: {getLineLength(diagonalLine).toFixed(2)}
                </div>
            {/each}
            <div>
                <SimpleMaths
                    equation="[{getLineLabel(diagonalLines[0])}]*[{getLineLabel(
                        diagonalLines[1],
                    )}]={totalDiagonalLength.toFixed(2)}"
                />
            </div>
        </div>
    </div>
</div>

<style>
    .result-wrapper {
        display: flex;
        flex-direction: row;
        & .results {
            flex-grow: 1;
            text-align: left;
        }
    }

    .quad-line {
        stroke: light-dark(#08166d, #1782ed);
        color: light-dark(#08166d, #1782ed);
    }

    .diagonal-line {
        stroke: light-dark(#6b091b, #cc1032);
        color: light-dark(#6b091b, #cc1032);
    }
</style>
