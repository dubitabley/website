<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();
</script>

<div class="home-wrapper">
    <div class="home-upper-wrapper">
        <div class="home-upper"></div>
    </div>
    <div class="home-border">
        {@render children()}
    </div>
</div>

<style>
    .home-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 15px;
        height: 100%;
    }
    .home-upper-wrapper {
        position: relative;
        width: 70%;
    }
    .home-upper {
        position: absolute;
        border-left: 5px double var(--primary-color);
        border-right: 5px double var(--primary-color);
        height: 3000px;
        bottom: 0;
        width: 100%;
    }
    .home-border {
        border: 5px double var(--primary-color);
        text-align: center;
        width: 100%;
    }

    :global(.home-border > *) {
        text-decoration: none;
        font-size: 30px;
        color: var(--primary-color-2) !important;
        font-weight: bold;
        /*animation: 1s linear 0s infinite forwards hue-anim;*/
        animation-name: hue-anim;
        animation-duration: 3s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        text-shadow: hsl(var(--home-hue), 100%, 50%) 1px 0 10px;
    }

    @property --home-hue {
        syntax: "<number>";
        initial-value: 0;
        inherits: false;
    }

    @keyframes hue-anim {
        from {
            --home-hue: 0;
        }

        to {
            --home-hue: 360;
        }
    }
</style>
