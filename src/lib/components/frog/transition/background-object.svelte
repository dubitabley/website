<script module>
    const BackgroundObject = {
        Cursor: 0,
        Key: 1
    } as const;
    type BackgroundObject = typeof BackgroundObject[keyof typeof BackgroundObject];
    const AllBackgroundObjects = Object.values(BackgroundObject);
    // we want this not to reactively update
    // svelte-ignore non_reactive_update
    let currentKey = 'd';
    const keyChars = "abcdefghijklmnopqrstuvwxyz";

    export function generateRandomBackgroundObject(): Snippet {
        const backgroundObject = getRandomValueInArray(AllBackgroundObjects);
        switch (backgroundObject) {
            case BackgroundObject.Cursor:
                return cursor;
            case BackgroundObject.Key:
                currentKey = getRandomCharInString(keyChars);
                return key;
        }
    }
</script>
<script lang="ts">
    import { onMount, type Snippet } from "svelte";
    import { fade } from "svelte/transition";
    import Cursor from "./cursor.svelte";
    import Key from "./key.svelte";
    import { getRandomCharInString, getRandomInt, getRandomValueInArray } from "../util/random";
    import { Tween } from "svelte/motion";

    type BackgroundObjectProps = {
        children: Snippet,
    }

    let {
        children,
    }: BackgroundObjectProps = $props();

    // pick start point and end point
    let x = $state(new Tween(0));
    let y = $state(new Tween(0));
    onMount(() => {
        const startX = getRandomInt(0, window.innerWidth);
        const startY = getRandomInt(0, window.innerHeight);

        const endX = getRandomInt(0, window.innerWidth);
        const endY = getRandomInt(0, window.innerHeight);

        x = new Tween(startX, {
            duration: 10000,
        });
        x.target = endX;
        y = new Tween(startY, {
            duration: 10000
        });
        y.target = endY;
    });

</script>

{#snippet cursor()}
    <Cursor />
{/snippet}

{#snippet key()}
    <Key key={currentKey} />
{/snippet}

<div class="background-object" in:fade out:fade
        style:left="{x.current}px" style:top="{y.current}px">
    {@render children()}
</div>

<style>
    .background-object {
        position: absolute;
        opacity: 0.3;
    }
</style>
