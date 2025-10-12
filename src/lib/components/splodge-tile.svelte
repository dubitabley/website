<script lang="ts">
    import { onMount, type Snippet } from "svelte";

    type SplodgeTileProps = {
        children: Snippet
    };
    
    let {
        children
    }: SplodgeTileProps = $props();
</script>

<style>

.splodge-tile {
    flex-grow: 1;
    width: 100%;
    height: 100%;
    --hue: 0;
    background: radial-gradient(hsl(var(--hue), 92%, 67%), transparent 70%);
    animation-name: hue-anim;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-timing-function: linear;
}

@keyframes hue-anim {
    0% {
        --hue: 0;
    }

    100% {
        --hue: 360;
    }
}

</style>

<div class="splodge-tile">
</div>

{@render children()}