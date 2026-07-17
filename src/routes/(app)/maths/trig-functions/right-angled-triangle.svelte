<script lang="ts">
    import SimpleMaths from "$lib/components/maths/equation/simple-maths.svelte";
    import SvgBase from "$lib/components/maths/svg-anim/svg-base.svelte";
    import { generateAnglePath } from "$lib/components/svg/utils";

    const OFFSET_X = 30;
    const OFFSET_Y = 20;

    const x = 48;
    const y = 55;
    // using pythagorean triple (48, 55, 73))
    const pointA = [OFFSET_X, OFFSET_Y] as const;
    const pointB = [OFFSET_X, OFFSET_Y + y] as const;
    const pointC = [OFFSET_X + x, OFFSET_Y + y] as const;

    // for the right angle
    const angleSize = 6;

    const aAngle = Math.atan2(x, y);
    const aAnglePath = generateAnglePath(pointA, Math.PI / 2 - aAngle, aAngle);

    const cAngle = Math.atan2(y, x);
    const cAnglePath = generateAnglePath(pointC, Math.PI, cAngle);
</script>

<div class="wrapper">
    <SvgBase>
        <!-- triangle -->
        <path
            d="M {pointA[0]} {pointA[1]} L {pointB[0]} {pointB[1]} L {pointC[0]} {pointC[1]} Z"
        />
        <text x={pointA[0] - 5} y={pointA[1] - 5}>A</text>
        <text x={pointB[0] - 6} y={pointB[1] + 15}>B</text>
        <text x={pointC[0] + 10} y={pointC[1] + 5}>C</text>
        <path
            d="M {pointB[0]} {pointB[1] - angleSize} L {pointB[0] +
                angleSize} {pointB[1] - angleSize} L {pointB[0] +
                angleSize} {pointB[1]}"
            class="angle"
        />
        <path d={aAnglePath} class="angle" />
        <path d={cAnglePath} class="angle" />
        <text x={pointC[0] - 17} y={pointC[1] - 3} font-size="0.5em">θ</text>
    </SvgBase>
    <div>
        <SimpleMaths equation="[sin][theta]=[AB]/[AC]" />, <br />
        <SimpleMaths equation="[cos][theta]=[BC]/[AC]" />, <br />
        <SimpleMaths equation="[tan][theta]=[AB]/[BC]" />
    </div>
</div>

<style>
    .angle {
        stroke-width: 0.1em;
    }

    .wrapper {
        height: 100%;
        flex-grow: 1;
    }
</style>
