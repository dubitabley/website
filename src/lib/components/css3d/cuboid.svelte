<script lang="ts">
    import type { Snippet } from "svelte";

    type CuboidProps = {
        side1?: Snippet;
        side2?: Snippet;
        side3?: Snippet;
        side4?: Snippet;
        side5?: Snippet;
        side6?: Snippet;
    };

    let { side1, side2, side3, side4, side5, side6 }: CuboidProps = $props();
</script>

<div class="cuboid">
    <div class="cuboid-side">{@render side1?.()}</div>
    <div class="cuboid-side">{@render side2?.()}</div>
    <div class="cuboid-side">{@render side3?.()}</div>
    <div class="cuboid-side">{@render side4?.()}</div>
    <div class="cuboid-side">{@render side5?.()}</div>
    <div class="cuboid-side">{@render side6?.()}</div>
</div>

<style>
    .cuboid {
        --cuboid-width: var(--width, 100px);
        --cuboid-height: var(--height, 100px);
        --cuboid-depth: var(--depth, 100px);

        height: var(--cuboid-height);
        width: var(--cuboid-width);
        background-color: transparent;
        position: relative;
    }

    .cuboid-side {
        border: 2px solid hsl(0, 0%, 10%);
        position: absolute;
    }

    .cuboid-side:nth-of-type(1),
    .cuboid-side:nth-of-type(2) {
        --coefficient: -0.5;
        height: var(--cuboid-height);
        width: var(--cuboid-width);
        transform: translate3d(
            0,
            0,
            calc(var(--cuboid-depth) * var(--coefficient))
        );
    }
    .cuboid-side:nth-of-type(2) {
        --coefficient: 0.5;
    }

    .cuboid-side:nth-of-type(3),
    .cuboid-side:nth-of-type(4) {
        --rotation: 90deg;
        height: var(--cuboid-height);
        width: var(--cuboid-depth);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotateY(var(--rotation))
            translate3d(0, 0, calc(var(--cuboid-width) * -0.5));
    }
    .cuboid-side:nth-of-type(4) {
        --rotation: -90deg;
    }

    .cuboid-side:nth-of-type(5),
    .cuboid-side:nth-of-type(6) {
        --rotation: -90deg;
        height: var(--cuboid-depth);
        width: var(--cuboid-width);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotateX(var(--rotation))
            translate3d(0, 0, calc(var(--cuboid-height) * -0.5));
    }
    .cuboid-side:nth-of-type(6) {
        --rotation: 90deg;
    }
</style>
