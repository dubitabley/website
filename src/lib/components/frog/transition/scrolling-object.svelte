<script module>
    export { dataBlock, rainbowCuboid };
</script>

<script lang="ts">
    import type { Snippet } from "svelte";
    import { Tween } from "svelte/motion";
    import DataBlock from "./data-block.svelte";
    import RainbowCuboid from "./rainbow-cuboid.svelte";

    type ScrollingObjectProps = {
        rotatePositive: boolean;
        children: Snippet;
    };

    let { rotatePositive, children }: ScrollingObjectProps = $props();

    let topPos = new Tween(-300, {
        duration: 10000,
    });
    topPos.target = window.innerHeight + 300;
</script>

{#snippet dataBlock(lines?: number)}
    <DataBlock lines={lines ?? 10} />
{/snippet}
{#snippet rainbowCuboid()}
    <RainbowCuboid />
{/snippet}

<div class="partial-transparent">
    <div
        class={[
            "scrolling-block",
            "white",
            rotatePositive ? "rotate" : "neg-rotate",
        ]}
        style:top="{topPos.current}px"
    >
        {@render children()}
    </div>
</div>

<style>
    .scrolling-block {
        display: block;
        position: absolute;
    }

    .partial-transparent {
        opacity: 0.6;
    }

    .rotate {
        rotate: 10deg;
    }

    .neg-rotate {
        rotate: -10deg;
    }

    .white {
        color: white;
    }
</style>
