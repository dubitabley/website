<script lang="ts">
    import CodeDemonstration from "$lib/components/code-demonstration.svelte";
    import SimpleMaths from "$lib/components/maths/simple-maths.svelte";
</script>

<h1>Maths!</h1>

{#snippet EquationDemonstration(equation: string)}
    <div class="equation">
        <CodeDemonstration>
            {#snippet code()}
                <p>{equation}</p>
            {/snippet}
            {#snippet output()}
                <SimpleMaths {equation} />
            {/snippet}
        </CodeDemonstration>
    </div>
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
{@render EquationDemonstration("e^(i{pi})=-1")}
{@render EquationDemonstration("\\sqrt(2+3)")}
{@render EquationDemonstration("n \\root x = x^(1/n)")}
{@render EquationDemonstration("\\integral9*6x{dx}")}
{@render EquationDemonstration("b \\defintegral a {f'}(t){dt}=f(b)-f(a)")}
{@render EquationDemonstration("n \\sum (i=1) i = (n(n+1))/2")}

<h3>Syntax Notes</h3>
<p>
    Basic operators are `+`, `-` and `*`. `*` will translate to a multiplication
    symbol. Whitespace is only used to separate numbers/elements, it doesn't get
    used in the output. Brackets have a dual purpose, they're either just
    brackets output but if they're used in a special part of another operator
    then they combine elements within the brackets for the operator. For example
    in 5^(7+9) then the brackets are used to put all of the 7+9 in the exponent.
    Speaking of which, `^` is an exponent symbol for powers and `/` is used for
    fractions/dividing.
</p>
<p>
    Normally every letter is used as an individual identifier but if you use
    `&lbrace;` and `&rbrace;` around them then it's treated as a single
    identifier. This is also used for special identifiers, so
    `&lbrace;pi&rbrace;` translates to the π symbol. This works for all greek
    letters and `&lbrace;u_pi&rbrace;` would do an upper case pi: Π.
</p>
<p>
    For special operators, we have \sqrt for square root, \root for general. The
    identifier before \root is the root of the radical and the identifier
    afterwards is the value inside the root. There's also \integral which shows
    the integral symbol, while \definteral has the upper bound before it and the
    lower bound after it. There's also \sum and \product for summation and
    products similarly.
</p>

<style>
    .equation {
        font-size: 1.2em;
    }
</style>
