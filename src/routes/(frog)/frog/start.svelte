<script lang="ts">
    import ClipMask, { circle } from "$lib/components/frog/clip/clip-mask.svelte";
    import type { ClipObject } from "$lib/components/frog/clip/clip-types";
    import FrogHop from "$lib/components/frog/frog-hop.svelte";
    import type { FrogInfo } from "$lib/components/frog/frog-types";
    import { onMount } from "svelte";
    import { GameState, getFrogPageContext } from "./frog-page-types";

    const CIRCLE_SIZE: number = 50;

    type StartProps = {
        clipObjects: ClipObject[],
    };

    let {
        clipObjects = $bindable([])
    }: StartProps = $props();

    const frogPage = getFrogPageContext();

    onMount(() => {
        frogPage.setFrogSnippet(frog);
    });

    function onHopEnd(frogInfo: FrogInfo) {

        let circleAttributes = $state({
            cx: frogInfo.x,
            cy: frogInfo.y,
            r: CIRCLE_SIZE}
        );

        // if we land on an existing clip object, just move to next state
        for (const clipObject of clipObjects) {
            if (Math.hypot(clipObject[1].cy - frogInfo.y, clipObject[1].cx - frogInfo.x) < CIRCLE_SIZE) {
                let speed = 2.0;
                let updateFunc = () => {
                    circleAttributes.r += speed;
                    speed += 0.1;

                    if (circleAttributes.r > Math.max(window.innerWidth, window.innerHeight)) {
                        frogPage.setGameState(GameState.Transition);
                    } else {
                        requestAnimationFrame(updateFunc);
                    }
                }
                frogPage.setFrogSnippet(null);
                requestAnimationFrame(updateFunc);
                break;
            }
        }

        clipObjects.push([circle, circleAttributes]);
    }
</script>

{#snippet frog()}
    <FrogHop onHopEnd={onHopEnd} />
{/snippet}

<ClipMask clipSnippets={clipObjects}>
    <div class="background">
        <div class="info-wrapper">

        </div>
        <div class="info-block">Tap on the screen!</div>
    </div>
</ClipMask>

<style>
    .info-block {
        padding: 10px;
        text-align: center;
        display: inline-block;
        color: black;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        border: 3px solid black;
        border-radius: 100px;
    }

    @property --offset {
        syntax: "<length>";
        initial-value: 0px;
        inherits: false;
    }

    .background {
        min-width: 100vw;
        min-height: 100vh;
        background-color: #ffddaa;
    }

    :global(html) {
        background:
            repeating-linear-gradient(
                120deg,
                rgb(0, 0, 100, 0.5) 0px,
                rgb(0, 0, 255, 0.5) 50px,
                rgb(0, 0, 100, 0.5) 100px
            ),
            repeating-linear-gradient(
                240deg,
                rgb(0, 0, 100, 0.5) 0px,
                rgb(0, 0, 255, 0.5) 50px,
                rgb(0, 0, 100, 0.5) 100px
            ),
            repeating-linear-gradient(
                0deg,
                rgb(0, 0, 10, 0.5) var(--offset),
                rgb(0, 0, 255, 0.2) calc(var(--offset) + 50px),
                rgb(0, 0, 10, 0.5) calc(var(--offset) + 100px)
            ),
            repeating-radial-gradient(
                rgb(0, 0, 200, 0.5) 0px,
                rgb(0, 0, 200, 0.5) 20px
            );
        animation-name: background-offset;
        animation-duration: 5s;
        animation-iteration-count: infinite;
    }

    @keyframes background-offset {
        0% {
            --offset: 0px;
        }

        50% {
            --offset: 50px;
        }

        100% {
            --offset: 0px;
        }
    }
</style>
