<!--
    @component Draw Path Anim
    From https://css-tricks.com/svg-line-animation-works/
 -->

<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { getSvgAnimContext } from "./svg-anim-types.svelte";

    type Props = {
        path: string;
        order: number;
    };

    let { path, order }: Props = $props();

    let amount = $state(0);
    let pathLength = $state(100);

    // at amount 0, offset is length
    // at amount 1, offset is 0
    let pathOffset = $derived(pathLength * (1 - amount));

    let pathElement: SVGPathElement;

    $effect(() => {
        // run effect if the path changes
        path;
        pathLength = pathElement.getTotalLength();
    });

    let context = getSvgAnimContext();

    const svgAnim = {
        order: () => order,
        updateFunc: (newAmount: number) => (amount = newAmount),
    };

    onMount(() => {
        context.addAnim(svgAnim);
    });

    onDestroy(() => {
        context.removeAnim(svgAnim);
    });
</script>

<path
    class="path"
    d={path}
    fill="none"
    bind:this={pathElement}
    style="--path-length: {pathLength}; --path-offset: {pathOffset}"
/>

<style>
    .path {
        stroke-dasharray: var(--path-length);
        stroke-dashoffset: var(--path-offset);
    }
</style>
