<script lang="ts">
    import { getInteractiveSvgContext } from "$lib/components/maths/svg-anim/interactive-svg-types";
    import { onMount } from "svelte";

    type Props = {
        angle: number;
        radius: number;
        centre: number;
        label: string;
    };

    let { angle = $bindable(), radius, centre, label }: Props = $props();

    let x = $derived(Math.cos(angle) * radius + centre);
    let y = $derived(Math.sin(angle) * radius + centre);

    let element: SVGElement;
    let text: SVGElement;

    const interactiveSvgContext = getInteractiveSvgContext();

    onMount(() => {
        const interactiveElement = {
            getElements: () => [element, text],
            moveElement: (offsetX: number, offsetY: number) => {
                const newX = offsetX - centre;
                const newY = offsetY - centre;
                angle = Math.atan2(newY, newX);
            },
        };
        interactiveSvgContext.addInteractiveElement(interactiveElement);

        return () => {
            interactiveSvgContext.removeInteractiveElement(interactiveElement);
        };
    });
</script>

<circle
    class="move"
    r="1"
    cx={x}
    cy={y}
    bind:this={element}
    fill="green"
    stroke="none"
/>
<text
    {x}
    y={y > 12 ? y - 2 : y + 14}
    stroke="none"
    fill="green"
    class="label"
    bind:this={text}
>
    {label}
</text>

<style>
    .move {
        cursor: move;
    }

    .label {
        font-size: 1em;
        font-weight: bold;
        text-anchor: middle;

        cursor: move;
        -webkit-user-select: none; /* Safari */
        user-select: none;
    }
</style>
