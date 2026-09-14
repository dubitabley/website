<script lang="ts">
    import SvgAnim from "$lib/components/maths/svg-anim/svg-anim.svelte";
    import SvgGraph from "$lib/components/maths/svg-anim/svg-graph.svelte";
    import SvgQuadratic from "$lib/components/maths/svg-anim/svg-quadratic.svelte";

    let coefficients = $state([3, -2, 1]);
</script>

<div>
    <div>
        <p>Coefficients:</p>
        <hr />
        <div>
            {#each coefficients as _, index}
                <input type="number" bind:value={coefficients[index]} />
                {#if index > 0}
                    x{#if index > 1}<sup>{index}</sup>{/if}
                {/if}
                {#if index < coefficients.length - 1}
                    +
                {/if}
            {/each}
        </div>
    </div>
    <SvgAnim title="Newton-Raphson" size={100}>
        <SvgGraph centreX={0} centreY={100} />
        <SvgQuadratic a={0} b={0} c={0} />
    </SvgAnim>
</div>
