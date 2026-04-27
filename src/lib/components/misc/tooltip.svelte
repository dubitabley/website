<script lang="ts">
    import type { Snippet } from "svelte";
    import QuestionMark from "./question-mark.svelte";

    type TooltipProps = {
        children: Snippet;
    };

    let { children }: TooltipProps = $props();
</script>

<button class="reset tooltip-button" popovertarget="tooltip-popover">
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
</button>

<span popover id="tooltip-popover" class="tooltip">
    {@render children()}
</span>

<style>
    .circle-outline {
        stroke: steelblue;
        fill: transparent;
    }

    .tooltip-button {
        anchor-name: --tooltip-anchor;
    }

    .tooltip {
        position-anchor: --tooltip-anchor;
        position-area: top span-all;
        width: 15em;
        text-align: center;
        margin-bottom: 5px;
        border-radius: 30px;
        background-color: var(--background-color);
        color: var(--primary-color);
        padding: 10px;
        justify-self: anchor-center;

        &[popover] {
            animation: scroll-in 0.2s ease-in;
        }
    }
    @keyframes scroll-in {
        from {
            translate: 0 20px;
            opacity: 0;
        }
        to {
            translate: 0 0;
            opacity: 1;
        }
    }
</style>
