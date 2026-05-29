<script lang="ts">
    import type { Snippet } from "svelte";
    import QuestionMark from "./question-mark.svelte";
    import Popover from "./popover.svelte";

    type TooltipProps = {
        children: Snippet;
    };

    let { children }: TooltipProps = $props();
</script>

<Popover>
    {#snippet popover()}
        {@render children()}
    {/snippet}
    <svg width="30" height="30" viewBox="0 0 100 100">
        <g style="--fill-colour: steelblue; --stroke-colour: steelblue">
            <circle
                class="circle-outline"
                stroke-width="10"
                cx="50"
                cy="50"
                r="40"
            />
            <g transform-origin="center" transform="scale(0.5)">
                <QuestionMark />
            </g>
        </g>
    </svg>
</Popover>

<style>
    .circle-outline {
        stroke: steelblue;
        fill: transparent;
    }
</style>
