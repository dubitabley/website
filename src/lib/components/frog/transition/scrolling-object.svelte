<script module>
    export { dataBlock };
</script>
<script lang="ts">
    import type { Snippet } from "svelte";
    import { Tween } from "svelte/motion";
    import DataBlock from "./data-block.svelte";

    type ScrollingObjectProps = {
        rotatePositive: boolean,
        children: Snippet
    }

    let {
        rotatePositive,
        children
    }: ScrollingObjectProps = $props();

    let topPos = new Tween(-300, {
        duration: 10000
    });
    topPos.target = window.innerHeight + 300;

</script>

{#snippet dataBlock()}
    <DataBlock lines={10} />
{/snippet}

<div class={[
    "scrolling-block",
    "partial-transparent",
    "white",
    rotatePositive ? "rotate" : "neg-rotate"
]}
    style:top="{topPos.current}px"
>
    {@render children()}
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
