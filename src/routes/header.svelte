<script lang="ts">
    import Theming from "./theming.svelte";
    import Splodge from "$lib/components/splodge.svelte";

    const headerTitle = "dubitable";

</script>

<div class="header">
    <div class="header-left">
        <Splodge>
            <a class="header-home" href="/">Home</a>
        </Splodge>
    </div>
    <h1 class="header-text">
        {#each headerTitle.normalize("NFC") as character, index}
            <span class="header-rotate-char"><span class="header-char" style:animation-delay="0.{index}s">{character}</span></span>
        {/each}
    </h1>
    <div class="header-theming">
        <Theming />
    </div>
</div>

<style>
    h1 {
        text-align: center;
        width: 100%;
    }

    .header-home {
        position: relative;
        left: 40px;
        top: -100px;
        background-color: transparent;
        text-decoration: none;
        font-size: 30px;
        color: var(--background-color-2);
        font-weight: bold;
    }

    .header-left {
        flex-grow: 0;
        aspect-ratio: 1 / 1;
        height: 100%;
    }

    @media (width < 400px) {
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
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        justify-items: center;
        align-items: center;
        height: 150px;
        border-bottom: 3px dashed var(--primary-color);
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
    }

    .header-rotate-char {
        display: inline-block;
        background-color: transparent;
    }

    .header-rotate-char:hover {
        animation-name: rotate;
        animation-delay: 0;
        animation-timing-function: linear;
        animation-duration: 0.5s;
        animation-iteration-count: infinite;
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
        syntax: '<number>';
        initial-value: 0;
        inherits: false;
    }

    @keyframes rainbow-color {
        0% {
            --hue: 0;
            --saturation: 100%;
            font-size: 30px;
        }

        100% {
            --hue: 360;
            --saturation: 100%;
            font-size: 50px;
        }
    }
</style>


