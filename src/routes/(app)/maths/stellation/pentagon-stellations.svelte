<script>
    import StarPolygonEdgeAnim from "$lib/components/maths/stellation/star-polygon-edge-anim.svelte";
    import StarPolygonVertexAnim from "$lib/components/maths/stellation/star-polygon-vertex-anim.svelte";
</script>

<div class="wrapper">
    <StarPolygonEdgeAnim numPoints={5} />
    <StarPolygonVertexAnim numPoints={5} />
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
