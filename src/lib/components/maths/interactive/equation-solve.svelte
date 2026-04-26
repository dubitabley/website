<script lang="ts">
    import type { Snippet } from "svelte";
    import { fly } from "svelte/transition";

    type Props = {
        equations: Snippet[];
        explanations: string[];
    };
    let { equations, explanations }: Props = $props();

    let currentIndex = $state(0);

    let direction = $state(1);

    function previous() {
        currentIndex -= 1;
        direction = -1;
    }

    function next() {
        currentIndex += 1;
        direction = 1;
    }
</script>

<div class="equation-solve">
    <div class="equations">
        {#key currentIndex - 1}
            <div
                class="first"
                in:fly={{ y: direction * 20, duration: 300 }}
                out:fly={{ y: -direction * 20, duration: 300 }}
            >
                {#if currentIndex > 0}
                    {@render equations[currentIndex - 1]()}
                {/if}
            </div>
        {/key}
        {#key currentIndex}
            <div
                class="second"
                in:fly={{ y: direction * 20, duration: 300 }}
                out:fly={{ y: -direction * 20, duration: 300 }}
            >
                {#if currentIndex < equations.length}
                    {@render equations[currentIndex]()}
                {/if}
            </div>
        {/key}
    </div>
    <div class="explanation">
        {#if explanations.length > currentIndex}
            <div>
                {explanations[currentIndex]}
            </div>
        {:else if currentIndex >= equations.length}
            <div>Our final state</div>
        {/if}
    </div>
    <div class="controls">
        <button class="button" onclick={previous} disabled={currentIndex === 0}
            >Previous</button
        >
        <button
            class="button"
            onclick={next}
            disabled={currentIndex >= equations.length}>Next</button
        >
    </div>
</div>

<style>
    .equation-solve {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
    }
    .controls {
        display: flex;
        flex-direction: column;
        gap: 5px;

        button {
            flex-grow: 1;
        }
    }
    .equations {
        display: grid;
        grid-template-rows: 1fr 1fr;
    }
    .first {
        grid-area: 1 / 1;
    }
    .second {
        grid-area: 2 / 1;
    }
    .explanation {
        display: flex;
        place-items: center;
    }
</style>
