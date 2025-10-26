<script lang="ts">
    import type { PageProps } from "./$types";
    import { type AnyPath } from "$lib/components/frog/path-objects";
    import ClipMask from "$lib/components/frog/clip-mask.svelte";
    import Frog from "$lib/components/frog/frog.svelte";

    let { data }: PageProps = $props();

    let rectClipObjects: AnyPath[] = $state([]);
</script>

<Frog />

<ClipMask clipObjects={rectClipObjects}>
    <div class="rect"></div>
</ClipMask>

<style>
    .rect {
        width: 100vw;
        height: 100vh;
        background:
            repeating-linear-gradient(
                120deg,
                rgb(0, 255, 0, 0.5) 0px,
                rgb(0, 0, 255, 0.5) 50px,
                rgb(0, 255, 0, 0.5) 100px
            ),
            repeating-linear-gradient(
                240deg,
                rgb(0, 255, 0, 0.5) 0px,
                rgb(0, 0, 255, 0.5) 50px,
                rgb(0, 255, 0, 0.5) 100px
            );
    }

    :global(html, body) {
        margin: 0;
        padding: 0;
    }

    :global(*) {
        box-sizing: border-box;
    }
</style>
