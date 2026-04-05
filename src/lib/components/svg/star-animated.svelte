<script lang="ts">
    import { onMount } from "svelte";
    import { lerp } from "../frog/util/numbers";

    const NUM_POINTS = 5;

    let starSize = $state(100);
    let centre = $derived(starSize / 2);
    let invert = $state(1);
    const outerProportion = 45 / 100;
    const innerProportion = 25 / 100;
    let outerSize = $derived(
        starSize * lerp(innerProportion, outerProportion, invert),
    );
    let innerSize = $derived(
        starSize * lerp(innerProportion, outerProportion, 1 - invert),
    );

    let starPath = $derived(getStarPath(generateCoords(innerSize, outerSize)));

    type Coord = [number, number];

    function generateCoords(innerSize: number, outerSize: number): Coord[] {
        let coords: Coord[] = [];

        for (let i = 0; i < NUM_POINTS * 2; i++) {
            const size = i % 2 == 0 ? innerSize : outerSize;
            const x =
                size * Math.cos((2 * Math.PI * i) / (NUM_POINTS * 2)) + centre;
            const y =
                size * Math.sin((2 * Math.PI * i) / (NUM_POINTS * 2)) + centre;
            coords[i] = [x, y];
        }

        return coords;
    }

    const AnimationStateTag = {
        Rotating: 0,
        Inverting: 1,
    } as const;
    type AnimationStateTag =
        (typeof AnimationStateTag)[keyof typeof AnimationStateTag];

    let rotation = $state(0);

    type RotatingState = {
        stateTag: typeof AnimationStateTag.Rotating;
        startRotation: number;
        endRotation: number;
        timeThrough: number;
    };

    function newRotatingState(): RotatingState {
        return {
            stateTag: AnimationStateTag.Rotating,
            startRotation: rotation,
            endRotation: rotation + 2 * Math.PI,
            timeThrough: 0,
        };
    }

    type InvertingState = {
        stateTag: typeof AnimationStateTag.Inverting;
        startValue: number;
        endValue: number;
        timeThrough: number;
    };

    function newInvertingState(): InvertingState {
        return {
            stateTag: AnimationStateTag.Inverting,
            startValue: invert,
            endValue: invert >= 0.95 ? 0 : 1,
            timeThrough: 0,
        };
    }

    type AnimationState = RotatingState | InvertingState;

    let currentAnimationState: AnimationState = $state(newRotatingState());

    function nextState(stateTag: AnimationStateTag): AnimationState {
        switch (stateTag) {
            case AnimationStateTag.Rotating:
                return newInvertingState();
            case AnimationStateTag.Inverting:
                return newRotatingState();
        }
    }

    function animate() {
        currentAnimationState.timeThrough += 0.003;
        if (currentAnimationState.timeThrough >= 1.0) {
            currentAnimationState = nextState(currentAnimationState.stateTag);
        }
        switch (currentAnimationState.stateTag) {
            case AnimationStateTag.Rotating:
                rotation =
                    (currentAnimationState.endRotation -
                        currentAnimationState.startRotation) *
                        currentAnimationState.timeThrough +
                    currentAnimationState.startRotation;
                break;
            case AnimationStateTag.Inverting:
                invert = lerp(
                    currentAnimationState.startValue,
                    currentAnimationState.endValue,
                    currentAnimationState.timeThrough,
                );
                break;
        }

        setTimeout(animate, 10);
    }

    onMount(() => {
        animate();
    });

    function coordString(coord: Coord): string {
        return `${coord[0]},${coord[1]}`;
    }

    function getStarPath(coords: Coord[]) {
        let pathString = `M `;

        for (const coord of coords) {
            pathString += `${coordString(coord)} `;
        }

        pathString += "Z";

        return pathString;
    }
</script>

<div class="star-wrapper">
    <svg
        class="star-svg"
        width="{starSize}mm"
        height="{starSize}mm"
        viewBox="0 0 {starSize} {starSize}"
    >
        <g>
            <path
                fill-rule="nonzero"
                class={["star", "animate-colour"]}
                style="--rotation: {rotation}rad"
                d={starPath}
            />
        </g>
    </svg>
</div>

<style>
    .star-wrapper {
        display: inline;
        padding: 0.5em;
    }
    .star-svg {
        width: 5em;
        height: 5em;
    }

    @property --hue {
        syntax: "<number>";
        initial-value: 0;
        inherits: false;
    }

    .star {
        stroke: black;
        stroke-width: 0.4em;

        --hue: 40;
        fill: hsl(var(--hue), 80%, 52%);

        rotate: var(--rotation);
        transform-origin: center;
    }

    .animate-colour {
        animation: colour-anim 5s linear infinite;
    }

    @keyframes colour-anim {
        from {
            --hue: 0;
        }
        to {
            --hue: 360;
        }
    }
</style>
