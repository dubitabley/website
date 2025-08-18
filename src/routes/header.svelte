<script>
    import Theming from "./theming.svelte";

    const headerTitle = "dubitable";

</script>

<div class="header">
    <h1 class="header-text">
        {#each headerTitle.normalize("NFC") as character, index}
            <span class="header-char" style:animation-delay="0.{index}s">{character}</span>
        {/each}
    </h1>
    <div class="header-theming">
        <Theming />
    </div>
</div>

<style>
    h1 {
        text-align: center;
        justify-content: center;
        width: 100%;
    }

    .header {
        display: flex;
        flex-direction: row;
        
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
    }

    .header-char {
        display: inline-block;
        background-color: transparent;
    }

    .header-char:hover {
        animation: 1s linear 0s rotate;
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


