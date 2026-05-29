<!--
    @component Component for a popover above some element
-->
<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        /**
         * The children of the snippet,
         * to become a button that when clicked opens the popover
         */
        children: Snippet;
        /**
         * The popover to be displayed
         */
        popover: Snippet;
    };

    let { children, popover }: Props = $props();

    const uid = $props.id();
</script>

<label style="--popover-anchor: --popover-anchor-{uid}">
    <button
        aria-label="Button to open popover"
        class="hidden-button"
        popovertarget="popover-{uid}"
    ></button>
    <popover-wrapper class="popover-wrapper"
        >{@render children()}</popover-wrapper
    >
</label>

<div
    class="popover"
    popover
    id="popover-{uid}"
    style="--popover-anchor: --popover-anchor-{uid}"
>
    <span class="main-popover">
        {@render popover()}
    </span>
    <div class="arrow"></div>
</div>

<style>
    .hidden-button {
        display: none;
    }
    .popover-wrapper {
        anchor-name: var(--popover-anchor);
        cursor: pointer;
    }

    .main-popover {
        position-anchor: var(--popover-anchor);
        position: fixed;
        position-area: top span-all;
        background-color: var(--background-color-2);
        border: 2px solid var(--primary-color-2);
        border-radius: 10px;
        color: var(--primary-color);
        max-width: 80%;
        box-shadow: 10px 5px 5px black;

        margin-bottom: calc(2 * var(--size));
        padding: 10px;

        max-width: 20em;
    }

    .popover {
        background: transparent;
        border: none;
        --size: 10px;
        &[popover] > * {
            animation: scroll-in 0.2s ease-in;
            overflow: visible;
        }
    }

    .arrow {
        position-anchor: var(--popover-anchor);
        position-area: top center;
        background-color: var(--primary-color-2);

        clip-path: shape(
            from 0 0,
            line to calc(2 * var(--size)) 0px,
            curve to var(--size) calc(2 * var(--size)) with var(--size),
            curve to 0 0 with var(--size)
        );
        position: fixed;

        width: calc(2 * var(--size));
        height: calc(2 * var(--size));
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
