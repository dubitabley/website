<script lang="ts">
    import StarAnimated from "$lib/components/svg/star-animated.svelte";
    import DayNight from "$lib/components/svg/day-night.svg?raw";
    import TriangleFavicon from "$lib/components/svg/triangle-favicon.svg";
    import { onMount } from "svelte";

    /*
    onMount(() => {
        const style = [
            `background-image: url("${TriangleFaviconUrl}")`,
            "background-size: 300px 300px",
            "background-position: center",
            "padding: 75px 150px",
            "line-height: 150px",
        ].join(";\n");
        console.log(style);
        console.log("%c ", style);
    });
    */
</script>

<svelte:head>
    <link rel="icon" href={TriangleFavicon} type="image/svg+xml" />
</svelte:head>

<h2>Using SVG in all the places</h2>

<div>
    <p>A star that morphs:</p>
    <StarAnimated />
</div>

<div>
    <p>
        Weird day night animation that I spent too much time on. Using <a
            href="https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_animation_with_SMIL"
            >SMIL</a
        > to get this together.
    </p>
    {@html DayNight}
    <p>
        I think CSS animations are nicer to work with but there are some cool
        things in SMIL that aren't doable in CSS animations.
    </p>
</div>
