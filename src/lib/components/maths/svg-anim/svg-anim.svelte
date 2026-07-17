<script lang="ts">
    import type { Snippet } from "svelte";
    import { setSvgAnimContext, SvgAnimContext } from "./svg-anim-types.svelte";
    import SvgBase from "./svg-base.svelte";

    type Props = {
        /** The SVG animations to run */
        children: Snippet;
        /** The size of the SVG canvas, defaults to 100 */
        size?: number;
        /** The title to put at the top */
        title?: string;
    };

    let { children, size = 100, title }: Props = $props();

    let context = $state(new SvgAnimContext());

    function togglePlay() {
        context.togglePlay();
    }

    function reset() {
        context.reset();
    }

    setSvgAnimContext(context);
</script>

<div class="wrapper">
    {#if title}
        <h3>{title}</h3>
    {/if}
    <SvgBase sizeX={size} sizeY={size} {children} />
    <div class="play-through">
        <button
            class={["svg-button", "reset"]}
            title={context.isFinished()
                ? "Restart"
                : !context.isPlaying()
                  ? "Play"
                  : "Pause"}
            onclick={context.isFinished() ? reset : togglePlay}
            ><div
                class={[
                    "button-icon",
                    context.isFinished()
                        ? "reset-button"
                        : !context.isPlaying()
                          ? "play-button"
                          : "pause-button",
                ]}
            ></div></button
        >
        <input
            type="range"
            step="0.01"
            min="0"
            max={context.getMaxOrder() + 1}
            bind:value={context.totalAmountThrough}
        />
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .play-through {
        margin-top: 0.5em;
        display: flex;
        flex-direction: row;
        gap: 0.5em;
    }

    .svg-button {
        width: 2em;
        height: 2em;

        &:hover > .button-icon {
            background: var(--primary-color);
        }

        & .button-icon {
            width: 100%;
            height: 100%;

            background: light-dark(hsl(0, 0%, 20%, 0.5), hsl(0, 0%, 80%, 0.5));
        }
    }

    .play-button {
        clip-path: shape(
            from 0.62% 0%,
            curve to 100% 46.04% with 12.04% 0.15%/97.38% 39.59%,
            curve to 0% 100% with 97.38% 51.76%/14.04% 99.41%,
            close
        );
    }

    .pause-button {
        clip-path: shape(
            from 63.08% 0.01%,
            hline to 100%,
            vline to 100%,
            hline to 63.08%,
            close,
            move to 0% 0%,
            hline to 36.92%,
            vline to 99.99%,
            hline to 0%,
            close
        );
    }

    .reset-button {
        clip-path: shape(
            from 26.6% 69.64%,
            curve to 67.11% 17.93% with 26.6% 69.64%/20.5% 22.62%,
            curve to 49.37% 99.06% with 99.95% 14.63%/49.37% 99.06%,
            line to 77.9% 100%,
            curve to 70.71% 0.01% with 77.9% 100%/132.12% -0.85%,
            curve to 13.66% 75.17% with 3.12% 0.95%/7.91% 65.76%,
            curve to 0% 82.55% with 19.41% 84.59%/0% 82.55%,
            line to 30.2% 99.74%,
            curve to 40.99% 66.51% with 30.2% 99.74%/40.03% 69.81%,
            curve to 26.6% 69.64% with 41.94% 63.21%/28.52% 84.27%,
            close
        );
    }
</style>
