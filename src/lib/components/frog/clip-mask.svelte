<script lang="ts">
    import type { Snippet } from "svelte";
    import type { AnyPath } from "./path-objects";
    import { generatePath } from "./clip-path";

    type ClipMaskProps = {
        children?: Snippet;
        clipObjects?: AnyPath[];
    };

    let { children, clipObjects = [] }: ClipMaskProps = $props();

    function getPath(): string {
        return generatePath(clipObjects);
    }
</script>

<span>
    <svg width="0" height="0" style:position="absolute" id="mask-svg">
        <mask id="myMask">
            <!-- make everything visible by default -->
            <!-- for some reason 100% doesn't work so using this hack -->
            <rect fill="white" x="0" y="0" width="100000" height="100000" />
            <!-- make these invisible -->
            <path fill="black" d={getPath()} />
        </mask>
    </svg>
    <span class="mask-object">
        {@render children?.()}
    </span>
</span>

<style>
    .mask-object {
        mask-image: url("#myMask");
        mask-mode: luminance;
    }
</style>
