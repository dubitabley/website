<script lang="ts">
    import type { Snippet } from "svelte";
    import { getFootnoteContext } from "./footnote-types";
    import { fade } from "svelte/transition";

    type FootnoteProps = {
        children: Snippet;
    };

    let { children }: FootnoteProps = $props();

    let footnoteContext = getFootnoteContext();
    let footnoteId = footnoteContext.length;
    footnoteContext.push(() => children);

    let visible = $state(false);
    let left = $state(true);

    function toggleVisible(element: HTMLElement) {
        visible = !visible;

        if (visible) {
            const elementBox = element.getBoundingClientRect();
            // if on left half of screen
            left = elementBox.x + elementBox.width / 2 < window.innerWidth / 2;
        }
    }
</script>

<!--
    Note in future I could use anchor positioning API
    https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning
    and popover API
    https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
    but they're not supported in firefox currently so can't
-->

<sup class="footnote">
    <button onclick={(e) => toggleVisible(<HTMLElement>e.target)}>
        [{footnoteId}]
    </button>
</sup>

{#if visible}
    <div transition:fade class="footnote-popup-wrapper">
        <div class="footnote-popup {left ? 'left' : 'right'}">
            {@render children()}
        </div>
    </div>
{/if}

<style>
    .left {
        left: 0;
    }

    .right {
        right: 0;
    }

    .footnote-popup-wrapper {
        position: relative;
        display: inline;
        bottom: 0px;
    }

    .footnote-popup {
        position: absolute;
        width: 220px;
        border: 2px solid var(--primary-color-2);
        border-radius: 10px;
        color: var(--primary-color-2);
        background-color: var(--background-color-2);
        display: inline;
        bottom: 20px;
        padding: 4px;
    }

    button {
        border: none;
        background: none;
        padding: 0;
        margin: 0;
        color: hsl(226, 88%, var(--secondary-lightness));
        cursor: pointer;
    }

    button:visited {
        color: hsl(278, 87%, var(--secondary-lightness));
    }
</style>
