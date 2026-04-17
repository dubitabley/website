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
    I want to write some maths posts on this website, mainly for fun and also
    for personal notes. Perhaps someone else could find them useful too. However
    I want to be able to write equations in these posts easily. The way to do
    this natively on the web is to use <a
        href="https://developer.mozilla.org/en-US/docs/Web/MathML">MathML</a
    > but this is a bit laborious to do by hand. Most solutions use LateX formatting
    for maths equations which is neat but I find it a little heavy on the syntax and
    I don't want to use a library for parsing so I wrote my own for my own custom
    format designed to be dead simple and intuitive. It's using a custom parsing and
    transforming system written in typescript that then uses a Svelte component for
    outputting as MathML.
</p>
<h3>Examples:</h3>
{@render EquationDemonstration("5+4")}
{@render EquationDemonstration("a^2+b^2=c^2")}
{@render EquationDemonstration("3^3^3^3")}
{@render EquationDemonstration("9*5a/(5*(9+6)^4)")}

<h3>Still to do:</h3>

<ul>
    <li>Roots - especially square root</li>
    <li>Integrals</li>
    <li>
        Special symbols such as pi - could just copy paste the symbol in
        currently but want a short code for convenience
    </li>
</ul>
