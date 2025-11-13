<script module>
    export { circle, rect };

    type CircleData = { cx: number; cy: number; r: number };
    type RectData = { x: number; y: number; width: number; height: number };
</script>

<script lang="ts" generics="T">
    import type { Snippet } from "svelte";

    type ClipMaskProps = {
        children?: Snippet;
        clipSnippets?: [Snippet<[T]>, T][];
    };

    let { children, clipSnippets }: ClipMaskProps = $props();
</script>

{#snippet circle(data: CircleData)}
    <circle cx={data.cx} cy={data.cy} r={data.r} />
{/snippet}

{#snippet rect(data: RectData)}
    <rect x={data.x} y={data.y} width={data.width} height={data.height} />
{/snippet}

<span>
    <svg width="0" height="0" style:position="absolute" id="mask-svg">
        <mask id="myMask">
            <!-- make everything visible by default -->
            <!-- for some reason 100% doesn't work so using this hack -->
            <rect fill="white" x="0" y="0" width="100000" height="100000" />
            <!-- make these invisible -->
            {#each clipSnippets as clipSnippet}
                {@render clipSnippet[0]?.(clipSnippet[1])}
            {/each}
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
