<script lang="ts">
    import FrogImage from "$lib/assets/frog/frog2.webp";
    import { getClipContext } from "./clip-types";
    import { circle } from "./clip-mask.svelte";
    import { setFrogContext, type FrogContext } from "./frog-types";
    import type { Snippet } from "svelte";

    type FrogProps = {
        children?: Snippet
    };

    let {
        children
    }: FrogProps = $props();

    const clipContext = getClipContext();

    // current position of the frog,
    // x and y are the centre points
    const frog: FrogContext = $state({
        x: 100,
        y: 100,
        size: 100,
        direction: 0,
    });

    setFrogContext(frog);

</script>

<div
    class="frog"
    style:left="{frog.x - frog.size / 2}px"
    style:top="{frog.y - frog.size / 2}px"
    style:rotate="{frog.direction - Math.PI / 2}rad"
>
    <img width="{frog.size}px" height="{frog.size}px" src={FrogImage} alt="Frog" />
</div>

{@render children?.()}

<style>
    .frog {
        position: absolute;
        z-index: 100;
    }
</style>
