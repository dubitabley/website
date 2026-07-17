<script lang="ts">
    import type { Snippet } from "svelte";
    import { SvelteMap } from "svelte/reactivity";
    import {
        setInteractiveSvgContext,
        type InteractiveElement,
    } from "./interactive-svg-types";

    type Props = {
        children: Snippet;
        sizeX?: number;
        sizeY?: number;
    };

    let { children, sizeX = 100, sizeY = 100 }: Props = $props();

    let draggedElement: InteractiveElement | null = null;

    let interactiveElements = new SvelteMap<string, InteractiveElement>();
    let id = $state(0);

    let svgElement: SVGSVGElement;

    let interactiveContext = {
        addInteractiveElement: (element: InteractiveElement) => {
            const elementId = id.toString();
            id += 1;
            const svgElements = element.getElements();
            for (const svgElement of svgElements) {
                svgElement.dataset.id = elementId;
            }
            interactiveElements.set(elementId, element);
        },
        removeInteractiveElement: (element: InteractiveElement) => {
            const elements = element.getElements();
            if (elements.length > 0) {
                const id = elements[0].dataset.id;
                if (id) {
                    interactiveElements.delete(id);
                }
            }
        },
    };

    setInteractiveSvgContext(interactiveContext);

    function mouseDown(event: MouseEvent) {
        const interactiveElement = getElementFromEvent(event);
        if (interactiveElement) {
            draggedElement = interactiveElement;
        }
    }

    function getElementFromEvent(event: MouseEvent): InteractiveElement | null {
        if (event.target) {
            const element = <SVGElement>event.target;
            const elementId = element?.dataset?.id;
            if (elementId) {
                const interactiveElement = interactiveElements.get(elementId);
                if (interactiveElement) {
                    return interactiveElement;
                }
            }
        }
        return null;
    }

    function mouseMove(event: MouseEvent) {
        if (draggedElement) {
            const elementSize = svgElement.getBoundingClientRect();
            draggedElement.moveElement(
                (sizeX * event.offsetX) / elementSize.width,
                (sizeY * event.offsetY) / elementSize.height,
            );
        }
    }

    function mouseUp() {
        draggedElement = null;
    }
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 {sizeX} {sizeY}"
    class="svg"
    role="button"
    tabindex="0"
    onmousedown={mouseDown}
    onmouseup={mouseUp}
    onmousemove={mouseMove}
    bind:this={svgElement}
>
    {@render children()}
</svg>

<style>
    .svg {
        background-color: light-dark(white, black);
        stroke-width: 3px;
        stroke: light-dark(black, white);
        width: 100%;
        height: 100%;
    }
</style>
