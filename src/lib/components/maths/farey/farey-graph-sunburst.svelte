<script lang="ts">
    import GraphLine from "../graphs/graph-line.svelte";
    import GraphPoint from "../graphs/graph-point.svelte";
    import Graph from "../graphs/graph.svelte";
    import { constructFarey } from "./farey";

    type Props = {
        n: number;
        reflect?: boolean;
    };

    let { n, reflect = false }: Props = $props();

    let fareyValues = $derived(constructFarey(n));
</script>

<Graph dims={{ left: 0, bottom: 0, top: n + 1, right: n + 1 }}>
    {#each fareyValues as fareyVal, i}
        <GraphPoint x={fareyVal[0]} y={fareyVal[1]} />
        {#if i < fareyValues.length - 1}
            <GraphLine
                x1={fareyVal[0]}
                y1={fareyVal[1]}
                x2={fareyValues[i + 1][0]}
                y2={fareyValues[i + 1][1]}
            />
        {/if}
    {/each}
    {#if reflect}
        {#each fareyValues as fareyVal, i}
            <GraphPoint x={fareyVal[1]} y={fareyVal[0]} />
            {#if i < fareyValues.length - 1}
                <GraphLine
                    x1={fareyVal[1]}
                    y1={fareyVal[0]}
                    x2={fareyValues[i + 1][1]}
                    y2={fareyValues[i + 1][0]}
                />
            {/if}
        {/each}
    {/if}
</Graph>
