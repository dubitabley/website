<script lang="ts">
    import StarPolygonVertexAnim from "$lib/components/maths/stellation/star-polygon-vertex-anim.svelte";
</script>

<div class="wrapper">
    <StarPolygonVertexAnim numPoints={7} vertexGap={2} title="&lbrace;7/2&rbrace; Heptagram" />
    <StarPolygonVertexAnim numPoints={7} vertexGap={3} title="&lbrace;7/3&rbrace; Heptagram" />
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        gap: 1em;

        @media (width < 500px) {
            flex-direction: column;
        }
    }
</style>
