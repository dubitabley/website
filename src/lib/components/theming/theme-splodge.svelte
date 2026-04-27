<script lang="ts">
    import type { Snippet } from "svelte";

    type ThemeSplodgeProps = {
        children: Snippet;
        colour: string;
        onClick?: () => void;
        isSelected?: boolean;
    };

    let { children, colour, onClick, isSelected }: ThemeSplodgeProps = $props();
</script>

<button
    class="splodge-wrapper"
    style="--fill-colour: {colour}"
    onclick={() => {
        if (onClick) {
            onClick();
        }
    }}
>
    <svg
        width="100mm"
        height="100mm"
        viewBox="0 0 100 100"
        class={["splodge-children", isSelected ? "selected" : "not-selected"]}
    >
        <g>
            <path
                d="M 16.8969,60.254135 C -1.4224409,51.265618 5.3361501,20.283944 35.571956,15.120332 65.807763,9.9567202 109.95609,9.9006822 88.217831,38.834697 69.765861,63.394595 81.002931,106.29364 60.472028,89.132115 45.176683,76.346935 30.769797,67.330195 16.8969,60.254135 Z"
            />
        </g>
    </svg>
    <div class="splodge-children">
        <div class="splodge-text">
            {@render children()}
        </div>
    </div>
</button>

<style>
    svg {
        fill: var(--fill-colour);

        rotate: var(--rotation, 0deg);
        stroke-width: 4px;

        &.selected {
            stroke: green;
        }

        &.not-selected {
            stroke: white;
        }
    }

    .splodge-wrapper {
        /* clear user agent styles */
        all: unset;

        display: grid;

        padding: 10px;

        width: 120px;
        height: 120px;

        transition: all 0.2s;

        &:hover {
            scale: 1.4;
        }
    }

    .splodge-children {
        grid-area: 1 / 1;
        --negative-fill: rgb(
            from var(--fill-colour) calc(255 - r) calc(255 - g) calc(255 - b)
        );
        text-shadow: 1px 1px var(--negative-fill);

        width: 100%;
        height: 100%;
        z-index: 5;
    }

    .splodge-text {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        /* set to opposite colour so text is legible */
        color: var(--negative-fill);
    }
</style>
