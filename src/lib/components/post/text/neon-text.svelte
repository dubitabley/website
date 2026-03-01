<script lang="ts">
    import type { Snippet } from "svelte";

    type NeonTextProps = {
        children: Snippet;
    };

    let { children }: NeonTextProps = $props();
</script>

<neon-text>
    {@render children()}
</neon-text>

<style>
    neon-text {
        /*text-shadow:
            1px 1px 2px black,
            0px 0 1em blue,
            150px 0 2em blue;*/
        color: hsl(211 83% 80%);
        font-size: 40px;
        background-color: black;
        border-radius: 20px;
        padding: 10px;
        animation-name: neon-scroll;
        animation-timing-function: linear;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    @keyframes neon-scroll {
        from {
            text-shadow:
                1px 1px 2px black,
                0px 0 1em blue,
                0 0 2em blue;
        }

        to {
            text-shadow:
                1px 1px 2px black,
                0px 0 1em blue,
                0px 0 0em blue;
        }
    }
</style>
