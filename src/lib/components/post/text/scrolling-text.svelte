<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        enabled: boolean;
        children: Snippet;
    };

    let { enabled, children }: Props = $props();
</script>

<div class="scrolling-wrapper">
    {#each { length: 10 }}
        <div class={["scroll-section", enabled && "enabled"]}>
            {@render children()}
        </div>
    {/each}
</div>

<style>
    .scrolling-wrapper {
        font-size: 30px;
        font-weight: bold;
        font-family:
            "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        border: 5px solid rebeccapurple;
        border-radius: 20px;
        overflow-x: hidden;
        gap: 10px;

        background-color: var(--primary-color);
        color: var(--background-color-2);
        padding: 10px;
    }

    .scroll-section {
        animation-name: scroll;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-play-state: paused;
        animation-timing-function: linear;
        white-space: nowrap;

        &.enabled {
            animation-play-state: running;
        }
    }

    @keyframes scroll {
        from {
            translate: calc(-100% + 10px) 0px;
        }

        to {
            translate: -200% 0px;
        }
    }
</style>
