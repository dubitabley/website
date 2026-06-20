<script lang="ts">
    import StarPolygonEdgeAnim from "$lib/components/maths/stellation/star-polygon-edge-anim.svelte";
    import StarPolygonVertexAnim from "$lib/components/maths/stellation/star-polygon-vertex-anim.svelte";
    import RadioGroup from "$lib/components/misc/radio-group.svelte";

    const StellationDrawType = {
        VertexDraw: 0,
        EdgeDraw: 1,
    } as const;
    type StellationDrawType =
        (typeof StellationDrawType)[keyof typeof StellationDrawType];

    let drawType: StellationDrawType = $state(StellationDrawType.VertexDraw);

    let numPoints = $state(5);
    let gap = $state(2);
    let maxGap = $derived(Math.ceil(numPoints / 2) - 1);

    $effect(() => {
        if (gap > maxGap) {
            gap = maxGap;
        }
    })

    let title = $derived.by(() => {
        switch (drawType) {
            case StellationDrawType.VertexDraw:
                return `Vertex Stellation of {${numPoints}/${gap}}`;
            case StellationDrawType.EdgeDraw:
                return `Edge Stellation of {${numPoints}/${gap}}`;
            default:
                throw new Error("Invalid stellation draw type");
        }
    });

    function drawTypeLabel(drawType: StellationDrawType): string {
        switch (drawType) {
            case StellationDrawType.VertexDraw:
                return "Draw between vertices:";
            case StellationDrawType.EdgeDraw:
                return "Draw from edges";
            default:
                throw new Error("Invalid stellation draw type");
        }
    }
</script>

<div>
    <RadioGroup
        options={[StellationDrawType.VertexDraw, StellationDrawType.EdgeDraw]}
        labelFunc={drawTypeLabel}
        bind:value={drawType}
    />
    <label>
        Vertex Num:
    <input type="number" min="5" bind:value={numPoints} />
    </label>
    <label>
        Gap:
        <input type="number" min="2" max={maxGap} bind:value={gap} />
    </label>
</div>
<div>
    {#if drawType === StellationDrawType.VertexDraw}
        <StarPolygonVertexAnim {numPoints} {title} vertexGap={gap} />
    {/if}
    {#if drawType === StellationDrawType.EdgeDraw}
        <StarPolygonEdgeAnim {numPoints} {title} edgeGap={gap} />
    {/if}
</div>
