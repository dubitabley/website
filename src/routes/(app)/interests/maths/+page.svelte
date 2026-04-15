<script lang="ts">
    import CodeDemonstration from "$lib/components/code-demonstration.svelte";
    import SimpleMaths from "$lib/components/maths/simple-maths.svelte";
</script>

<h1>Maths!</h1>

{#snippet EquationDemonstration(equation: string)}
    <CodeDemonstration>
        {#snippet code()}
            <p>{equation}</p>
        {/snippet}
        {#snippet output()}
            <SimpleMaths {equation} />
        {/snippet}
    </CodeDemonstration>
{/snippet}

<p>
    I wanted to be able to easily write maths equations for posts about maths in
    the interests section so I wrote a hacky thing for displaying maths
    equations easily, displaying using <a
        href="https://developer.mozilla.org/en-US/docs/Web/MathML">MathML</a
    >. Most solutions use LateX formatting for maths equations which is neat but
    I find it a little heavy on the syntax and I don't want to use a library for
    parsing so I wrote my own.
</p>
<h3>Examples:</h3>
{@render EquationDemonstration("5+4")}
{@render EquationDemonstration("a^2+b^2=c^2")}
{@render EquationDemonstration("3^3^3^3")}
{@render EquationDemonstration("9*5a/(5*(9+6)^4)")}

<p>Still to do:</p>

<ul>
    <li>Roots - especially square root</li>
    <li>Integrals</li>
    <li>
        Special symbols such as pi - could just copy paste the symbol in
        currently but want a short code for convenience
    </li>
</ul>
