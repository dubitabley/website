<!--
    @component 3d layered text
    Adapted from https://css-tricks.com/3d-layered-text-the-basics/
-->
<script lang="ts">
    type Props = {
        text: string;
    };

    let { text }: Props = $props();

    const layerCount = 16;
</script>

<div class="scene">
    <div class="text" style="--layers-count: {layerCount}">
        <span class="bottom-text">{text}</span>
        <div class="layers" aria-hidden="true" style="--text: {text}">
            {#each { length: layerCount }, i}
                <div
                    class={["layer", i != layerCount - 1 && "unselectable"]}
                    style="--i: {i}"
                >
                    {text}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .layer {
        transform: translateZ(calc(var(--i) * var(--layer-offset)));
        --n: calc(var(--i) / var(--layers-count));
        color: hsl(20 100% calc(var(--n) * 80%));

        &::before {
            content: var(--text);
        }
    }

    .text {
        position: relative;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 90px;
        text-align: center;
        rotate: x -10deg;
        --layer-offset: 1px;

        .layers,
        .layer {
            position: absolute;
            inset: 0;
        }
    }

    .unselectable {
        user-select: none;
    }

    .bottom-text {
        text-shadow: 0 0 0.1em #003;
    }

    .scene {
        perspective: 400px;
        padding: 40px;

        * {
            transform-style: preserve-3d;
        }
    }
</style>
