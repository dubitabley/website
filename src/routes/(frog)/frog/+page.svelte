<script lang="ts">
    import type { PageProps } from "./$types";
    import Frog from "$lib/components/frog/frog.svelte";
    import { setClipContext, type ClipContext } from "$lib/components/frog/clip/clip-types";
    import Transition from "./transition.svelte";
    import Start from "./start.svelte";
    import { GameState, setFrogPageContext, type FrogPageContext } from "./frog-page-types";
    import type { Snippet } from "svelte";

    let { data }: PageProps = $props();

    let clipContext: ClipContext = $state({
        clipObjects: [],
    });

    setClipContext(clipContext);

    let gameState: GameState = $state(GameState.Start);
    let frogSnippet: Snippet | null = $state(null);

    const frogPageContext: FrogPageContext = $state({
        setGameState: (newState: GameState) => {
            gameState = newState;
        },
        setFrogSnippet: (snippet: Snippet) => {
            frogSnippet = snippet;
        }
    });
    setFrogPageContext(frogPageContext);

</script>

<Frog>
    {@render frogSnippet?.()}
</Frog>

{#if gameState == GameState.Start}
    <Start clipObjects={clipContext.clipObjects} />
{/if}

{#if gameState == GameState.Transition}
    <Transition />
{/if}

<style>

    :global(html, body) {
        margin: 0;
        padding: 0;
    }

    :global(*) {
        box-sizing: border-box;
    }
</style>
