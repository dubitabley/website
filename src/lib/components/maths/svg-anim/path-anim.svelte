<script module>
    export type PathFunction = (amountThrough: number) => string;
</script>

<!--
    @component Animates an SVG path that morphs
 -->
<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    import { getSvgAnimContext } from "./svg-anim-types.svelte";

    type Props = {
        pathFunction: PathFunction;
        order: number;
    };

    let { pathFunction, order }: Props = $props();

    let amount = $state(0);

    let path = $derived(pathFunction(amount));

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

<path d={path} fill="none" />
