<script lang="ts">
    import Theming from "./theming.svelte";
    import HomeButton from "$lib/components/home-button.svelte";

    const headerTitle = "dubitable";
</script>

<div class="header">
    <div class="header-left">
        <HomeButton>
            <a class="header-home" href="/">Home</a>
        </HomeButton>
    </div>
    <h1 class="header-text">
        {#each headerTitle.normalize("NFC") as character, index}
            <span class="header-rotate-char"
                ><span class="header-char" style:animation-delay="0.{index}s"
                    >{character}</span
                ></span
            >
        {/each}
    </h1>
    <div class="header-theming">
        <Theming />
    </div>
</div>
{#snippet decorSvg(amount: number)}
    <svg
        class="header-decor-svg"
        viewBox="0 0 100 100"
        width="100mm"
        height="100mm"
    >
        <g>
            {#each { length: amount }, index}
                {#each { length: index + 1 }, index2}
                    <rect
                        x="0"
                        y="0"
                        width={100 - 100 * ((index + 1) / (amount + 1))}
                        height={100 * ((index2 + 1) / (amount + 1))}
                    />
                {/each}
            {/each}
        </g>
    </svg>
{/snippet}
<div class="header-decor-wrapper">
    <div class="header-decor decor-left">
        {@render decorSvg(5)}
    </div>
    <div class="header-decor decor-right">
        {@render decorSvg(5)}
    </div>
</div>

<style>
    h1 {
        text-align: center;
        width: 100%;
    }

    .header-left {
        flex-grow: 0;
        aspect-ratio: 1 / 1;
        height: 100%;
    }

    @media (width < 420px) {
        .header-left {
            aspect-ratio: 1 / 1;
            height: 50%;
        }

        .header-home {
            font-size: 20px;
            left: 10px;
            top: -50px;
        }
    }

    .header-text {
        flex-grow: 1;
        text-wrap: nowrap;
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 150px;
        border-bottom: 3px solid var(--primary-color);
    }

    .header-theming {
        justify-content: end;
    }

    .header-char {
        --saturation: 100%;
        color: hsl(var(--hue), var(--saturation), var(--secondary-lightness));
        animation-name: rainbow-color;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: alternate;

        background-color: transparent;

        --small-font-size: 30px;
        --large-font-size: 50px;

        @media (width <= 500px) {
            --small-font-size: 20px;
            --large-font-size: 30px;
        }

        @media (width <= 300px) {
            --small-font-size: 10px;
            --large-font-size: 20px;
        }
    }

    .header-rotate-char {
        display: inline-block;
        background-color: transparent;

        &:hover {
            animation-name: rotate;
            animation-delay: 0;
            animation-timing-function: linear;
            animation-duration: 0.5s;
            animation-iteration-count: infinite;
        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    @property --hue {
        syntax: "<number>";
        initial-value: 0;
        inherits: false;
    }

    @keyframes rainbow-color {
        0% {
            --hue: 0;
            --saturation: 100%;
            font-size: var(--small-font-size);
        }

        100% {
            --hue: 360;
            --saturation: 100%;
            font-size: var(--large-font-size);
        }
    }

    .header-decor-wrapper {
        position: relative;
    }

    .header-decor {
        position: absolute;
    }

    .decor-right {
        right: 0;
        scale: -1 1;
    }

    .header-decor-svg {
        width: 50px;
        height: 50px;

        & rect {
            fill: var(--primary-color);
            opacity: 0.3;
        }
    }
</style>
