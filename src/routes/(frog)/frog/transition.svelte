<script lang="ts">
    import FrogFall from "$lib/components/frog/frog-fall.svelte";
    import ScrollingObject, {
        dataBlock,
        rainbowCuboid,
    } from "$lib/components/frog/transition/scrolling-object.svelte";
    import { onMount, type Snippet } from "svelte";
    import { getFrogPageContext } from "./frog-page-types";
    import BackgroundObject, {
        generateRandomBackgroundObject,
    } from "$lib/components/frog/transition/background-object.svelte";
    import { SvelteMap } from "svelte/reactivity";
    import { ScrollingInfo } from "$lib/components/frog/transition/scrolling-info";
    import {
        ScrollingObjectType,
        type GenericScrollingObject,
        type SnippetWithParams,
    } from "$lib/components/frog/transition/scrolling-type";

    let scrollingBlocks: SnippetWithParams<any>[] = $state([]);

    let counter = 0;
    let backgroundObjects: SvelteMap<number, Snippet> = new SvelteMap();

    const frogPage = getFrogPageContext();
    frogPage.setFrogSnippet(frog);

    let updateFrameId: number | null = null;
    let scrollingObjectTimerId: number | null;
    let scrollingObjectIndex: number = 0;

    function generateNextScrollingObject() {
        if (scrollingObjectIndex < ScrollingInfo.length) {
            const objectToAdd = ScrollingInfo[scrollingObjectIndex];
            scrollingObjectIndex += 1;
            addScrollingObject(objectToAdd);
        } else {
            // move to next phase
        }

        scrollingObjectTimerId = setTimeout(generateNextScrollingObject, 3000);
    }

    function addScrollingObject(scrollingObject: GenericScrollingObject) {
        switch (scrollingObject.objectType) {
            case ScrollingObjectType.DataBlock:
                scrollingBlocks.push([dataBlock, scrollingObject.lines]);
                break;
            case ScrollingObjectType.RainbowCuboid:
                scrollingBlocks.push([rainbowCuboid, null]);
                break;
        }
    }

    onMount(() => {
        updateFrameId = requestAnimationFrame(update);
        generateNextScrollingObject();

        return () => {
            if (updateFrameId) {
                cancelAnimationFrame(updateFrameId);
            }
            if (scrollingObjectTimerId) {
                clearTimeout(scrollingObjectTimerId);
            }
        };
    });

    function update() {
        if (Math.random() < 0.02) {
            // generate new background object
            const backgroundSnippet = generateRandomBackgroundObject();
            let index = counter++;
            backgroundObjects.set(index, backgroundSnippet);

            setTimeout(() => {
                backgroundObjects.delete(index);
            }, 8000);
        }

        updateFrameId = requestAnimationFrame(update);
    }
</script>

{#snippet frog()}
    <FrogFall />
{/snippet}

<div class="background">
    <div class="background-objects">
        {#each backgroundObjects as [index, object] (index)}
            <BackgroundObject>
                {@render object()}
            </BackgroundObject>
        {/each}
    </div>
    <div class="scrolling-objects">
        {#each scrollingBlocks as [snippet, args]}
            <ScrollingObject rotatePositive={true}>
                {@render snippet(args)}
            </ScrollingObject>
        {/each}
    </div>
</div>

<style>
    .background {
        min-width: 100vw;
        height: 100vh;
        background-color: black;
    }

    .scrolling-objects {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    :global(html) {
        overflow-y: hidden;
    }
</style>
