<script lang="ts">
    import ClipMask, { circle } from "$lib/components/frog/clip-mask.svelte";
    import type { ClipObject } from "$lib/components/frog/clip-types";
    import FrogHop from "$lib/components/frog/frog-hop.svelte";
    import type { FrogInfo } from "$lib/components/frog/frog-types";
    import { getFrogPageContext } from "./frog-page-types";

    type StartProps = {
        clipObjects: ClipObject[],
    };

    let {
        clipObjects = $bindable([])
    }: StartProps = $props();

    const frogPage = getFrogPageContext();
    frogPage.setFrogSnippet(frog);

    function onHopEnd(frogInfo: FrogInfo) {
        clipObjects.push([circle, {cx: frogInfo.x, cy: frogInfo.y, r: 50}]);
    }
</script>

{#snippet frog()}
    <FrogHop onHopEnd={onHopEnd} />
{/snippet}

<ClipMask clipSnippets={clipObjects}>
    <div class="background">
        <div class="first-block">Tap on the screen!</div>
    </div>
</ClipMask>

<style>
    .first-block {
        padding: 10px;
        text-align: center;
        display: inline-block;
        color: white;
        border: 2px solid white;
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
        background-color: seagreen;
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
