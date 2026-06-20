<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();
</script>

<h1 class="header">
    <span class="star-wrapper">
        <span class="star star-1"></span>
        <span class="star star-2"></span>
        <span class="star star-3"></span>
    </span>
    {@render children()}
</h1>

<style>
    .header {
        text-align: center;
        font-size: 3em;
        text-shadow: 3px 3px var(--background-color-2);

        &:hover {
            --star-background: linear-gradient(red, orange, blue);
        }
    }

    .star-wrapper {
        position: relative;
    }

    .star {
        display: inline-block;
        position: absolute;
        width: 1em;
        height: 1em;
        background: var(
            --star-background,
            light-dark(hsl(0, 10%, 10%, 0.3), hsl(0, 10%, 90%, 0.3))
        );

        clip-path: shape(
            from 99.84% 75.61%,
            curve to 64.2% 72.81% with 97.64% 79.22%/68.15% 71.16%,
            curve to 41.64% 99.98% with 60.26% 74.46%/45.83% 100.91%,
            curve to 33.35% 65.92% with 37.46% 99.04%/36.18% 69.08%,
            curve to 0% 53.3% with 30.53% 62.75%/0.39% 57.48%,
            curve to 30.52% 35.05% with -0.38% 49.11%/28.32% 38.65%,
            curve to 32.46% 0.08% with 32.72% 31.44%/28.52% 1.73%,
            curve to 59.61% 22.87% with 36.41% -1.57%/55.43% 21.93%,
            curve to 94.17% 13.88% with 63.8% 23.8%/91.34% 10.71%,
            curve to 80.43% 46.21% with 96.99% 17.04%/80.05% 42.02%,
            curve to 99.84% 75.61% with 80.82% 50.39%/102.04% 72.01%,
            close
        );
    }

    .star-1 {
        translate: 0.5em 0em;
        scale: 0.8;
        transform-origin: -3px -2px;
        animation-name: star-rotate;
        animation-timing-function: linear;
        animation-duration: 7s;
        animation-iteration-count: infinite;
    }

    .star-2 {
        translate: 4em 0.8em;
        transform-origin: 0.3em 0.4em;
        animation-name: star-rotate;
        animation-timing-function: linear;
        animation-duration: 5s;
        animation-iteration-count: infinite;
    }

    .star-3 {
        scale: 0.4 0.4;
        translate: 2em 0em;
        transform-origin: 0.3em 0.4em;
        animation-name: star-rotate;
        animation-timing-function: linear;
        animation-direction: reverse;
        animation-duration: 5s;
        animation-iteration-count: infinite;
    }

    @keyframes star-rotate {
        from {
            rotate: 0;
        }
        to {
            rotate: 360deg;
        }
    }
</style>
