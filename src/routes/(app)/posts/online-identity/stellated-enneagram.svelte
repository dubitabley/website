<script lang="ts">
    import { getRandomValueInArray } from "$lib/components/frog/util/random";
    import { generatePolygonPath } from "$lib/components/svg/utils";
    import { fade } from "svelte/transition";

    type Props = {
        innerText?: string;
        onFinish?: () => void;
    };

    let { innerText = "", onFinish }: Props = $props();

    type SpinChar = {
        char: string;
        moved: boolean;
    };
    // want this to only get the initial value
    // svelte-ignore state_referenced_locally
    let spinText: SpinChar[] = $state(
        Array.from(innerText).map((x) => {
            return { char: x, moved: false };
        }),
    );

    const acceleration = 0.002;
    let angularVelocity = $state(0);
    let running: boolean = false;
    let ending: boolean = false;
    let finished: boolean = false;
    let pressed: boolean = $state(false);

    function moveRandomChar(): boolean {
        const elements = spinText.filter((x) => !x.moved);
        if (elements.length > 0) {
            const value = getRandomValueInArray(elements);
            value.moved = true;

            return elements.length <= 1;
        }
        return true;
    }

    let speedCooldown = 0;

    // angle in radians
    let angle = $state(0);
    let scale = $state(1);

    function update() {
        if (angularVelocity > 0) {
            running = true;
            angularVelocity -= acceleration;
            angle += angularVelocity;

            if (
                angularVelocity > 2 &&
                performance.now() - speedCooldown > 500
            ) {
                speedCooldown = performance.now();
                if (moveRandomChar()) {
                    // start end
                    ending = true;
                }
            }

            if (ending) {
                scale += 0.1;
                if (scale > 5) {
                    finished = true;
                    if (onFinish) {
                        onFinish();
                    }
                }
            }

            if (!finished) {
                requestAnimationFrame(update);
            }
        } else {
            running = false;
        }
    }

    function elementClick() {
        angularVelocity += 0.2;
        pressed = true;
        if (!running) {
            update();
        }
    }

    function elementRelease() {
        pressed = false;
    }

    const radius = 50;

    // {9/3} stellation:
    // https://en.wikipedia.org/wiki/File:Enneagon_stellations.svg
    // made up of 3 triangles

    const tri1Path = generatePolygonPath(radius, 3);
    const tri2Path = generatePolygonPath(radius, 3, (Math.PI * 2) / 9);
    const tri3Path = generatePolygonPath(radius, 3, (Math.PI * 4) / 9);

    const charSize = 10;

    function textIndexToX(index: number): number {
        return radius + 0.7 * radius * Math.cos((2 * Math.PI * index) / 9);
    }
    function textIndexToY(index: number): number {
        return radius + 0.7 * radius * Math.sin((2 * Math.PI * index) / 9);
    }
</script>

<button
    class={["reset", "bounce", pressed ? "pressed" : ""]}
    onmousedown={elementClick}
    onmouseup={elementRelease}
>
    <svg
        viewBox="0 0 {radius * 2} {radius * 2}"
        style="--angle: {angle}rad; --scale: {scale}"
    >
        <g class="rotate scale">
            <path d={tri1Path} class="path" fill="none" />
            <path d={tri2Path} class="path" fill="none" />
            <path d={tri3Path} class="path" fill="none" />

            {#each spinText as spinChar, index}
                {#if !spinChar.moved}
                    <!--
                        would use crossfade
                        but need this to work: https://github.com/sveltejs/svelte/issues/7661
                        -->
                    <text
                        transition:fade
                        style="--text-size: {charSize}px"
                        class="text"
                        x={textIndexToX(index + 7)}
                        y={textIndexToY(index + 7)}
                        dx={-charSize / 2}
                        dy={charSize / 2}>{spinChar.char}</text
                    >
                {/if}
            {/each}
        </g>
        <g>
            <text
                class="text faded-text"
                text-anchor="middle"
                x={radius}
                y={radius}
                dy="3"
            >
                Tap!
            </text>
        </g>
        <g>
            <!-- Text at the bottom -->
            {#each spinText as spinChar, index}
                {#if spinChar.moved}
                    <text
                        transition:fade
                        style="--text-size: {charSize}px"
                        class="final-text"
                        x={index * charSize + 10}
                        y="95"
                        dx={-charSize / 2}
                        dy={charSize / 2}>{spinChar.char}</text
                    >
                {/if}
            {/each}
        </g>
    </svg>
</button>

<style>
    .path {
        stroke: var(--stroke, var(--primary-color, black));
    }

    .rotate {
        rotate: var(--angle);
        transform-origin: center;
    }

    .scale {
        scale: var(--scale);
    }

    button {
        display: block;
        width: 100%;
        height: 100%;
    }

    .faded-text {
        opacity: 0.5;
    }

    .bounce {
        transition: all 0.2s;
        &.pressed {
            scale: 0.8;
        }
    }

    .text {
        font-size: var(--text-size, 12px);
        fill: var(--text-colour, var(--primary-color, black));
        text-shadow: 2px 2px rgb(255, 0, 0, 0.5);
    }

    .final-text {
        font-size: calc(4px + var(--text-size, 12px));
        fill: hsl(40, 80%, var(--secondary-lightness));
        text-shadow: 4px 4px hsl(0, 80%, var(--primary-lightness), 0.7);
    }
</style>
