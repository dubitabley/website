<script>
    import SimpleMaths from "$lib/components/maths/equation/simple-maths.svelte";
    import EquationSolve from "$lib/components/maths/interactive/equation-solve.svelte";
    import Footnote from "$lib/components/post/footnote.svelte";
    import Post from "$lib/components/post/post.svelte";
</script>

<Post>
    <h2 class="old-header">Old fractions</h2>
    <p>
        I was reading the book `The Man of Numbers` by Keith Devlin which is
        about the life of Fibonacci and how he introduced/popularised the
        Hindu-Arabic Numerals to Europe from Arabian/North African traders. The
        book isn't amazing but one interesting part was a section on fractions
        in Leonardo of Pisa's time. <Footnote
            >Fibonacci wasn't his actual name but comes from the fact that he
            describes himself as in the Bonacci family from the Latin <i
                >filius Bonacci</i
            ></Footnote
        > They would've written fractions like so:
    </p>
    <div>
        <SimpleMaths equation="1/2 2/3 4/5" />
        <p>
            If we translate that to our modern way of writing fractions this is
            equal to <SimpleMaths
                equation="1/(2*3*5) + 2/(3*5) + 4/5 = 1/30 + 4/30 + 24/30 = 29/30"
            />. This seems a bizarre way of doing it but let's say you were
            writing down a length using the imperial units with these conversion
            units.
        </p>
        <ul>
            <li>12 inches = 1 foot</li>
            <li>3 feet = 1 yard</li>
            <li>22 yards = 1 chain</li>
            <li>10 chains = 1 furlong</li>
            <li>8 furlongs = 1 mile</li>
        </ul>
        <p>
            Our length might be 2 miles, 3 furlongs, 4 chains, 15 yards, 1 foot
            and 5 inches. <Footnote
                >This is a ridiculous amount of precision for a large length but
                it's an example.</Footnote
            > We could write that using the fractions as the following in miles:
            <SimpleMaths equation="5/12 1/3 15/22 4/10 3/8 2" />. Note that it
            goes from right to left, something the book posits might be a
            consequence of coming from Arabic which is written in that way. Or
            we could write a length of time like so <SimpleMaths
                equation="23/60 36/60 5/24 2"
            /> in terms of days instead of writing 2 days, 5 hours, 36 minutes and
            23 seconds. This would've been exceptionally useful for when measurements
            were much less standardised across the world and even coins/money weren't
            decimalised; using 12 denaris to 1 solidus, 20 solidi to 1 libra in medieval
            Pisa.
        </p>
        <p>
            Even our system can be written in this way; so we could write the
            square root of 2: <SimpleMaths
                equation="\sqrt 2 = 1.41421 = 1/10 2/10 4/10 1/10 4/10 1"
            />. Note that another way of doing this is using a recursive
            fraction. So we could write it like <SimpleMaths
                equation="1+(4+(1+(4+(2+1/10)/10)/10)/10)/10"
            />. This is different from a
            <a href="https://en.wikipedia.org/wiki/Continued_fraction"
                >continued fraction</a
            >
            which has the recursion on the denominator but we can write it like that
            in this way:
            <SimpleMaths equation="1=1/(2+1/(1+1/(2+1/(6+1/(1+[...])))))" /> Note
            that it goes on a while but since I'm only using an approximation being
            more precise wouldn't be meaningful. The algorithm for calculating this
            can be found on
            <a
                href="https://en.wikipedia.org/wiki/Simple_continued_fraction#Motivation_and_notation"
                >the Wikipedia page.</a
            >
        </p>
    </div>
    <p>
        It is useful to note how much the notation we use to represent a thing
        tends to drive the way we think about the thing itself. Numbers don't
        come pre-ordained with labels saying what they should be; those labels
        are assigned by us and we can use whichever ones we choose to. The
        standard ones currently used across the globe have been constructed and
        refined over millenia. Europe used Roman Numerals for centuries until
        the rise of trade across the Mediterranean made the advantages of
        Hindu-Arabic numerals for calculations and storage especially for larger
        numbers irresistible. It also had the advantage of making the language
        of mathematics more abstract which makes it more generic and more
        powerful, enabling future advancements.
    </p>
    <p>
        To experiment with this fraction system and thinking about it; we could
        construct the following infinite fraction with infinitely many halves: <SimpleMaths
            equation="[...] 1/2 1/2 1/2 1/2 1"
        />. This would just be <SimpleMaths
            equation="1+1/2+1/4+1/8+1/16+[...]"
        /> which is one of the first series used to demonstrate converging infinite
        series; it is equal to 2. An interesting way to show this is using the recursive
        fraction from earlier, we could wonder what is the value equal to the following:
        <SimpleMaths equation="1+(1+(1+(1+[...])/2)/2)/2" />. If we expand this
        out, we can get the following:
        <SimpleMaths equation="1+1/2+(1+(1+(1+[...])/2)/2)/4" />,
        <SimpleMaths equation="1+1/2+1/4+(1+(1+[...])/2)/8" /> and if we continue
        we see this is equal to the infinite sum from before. Then we can get the
        value of the sum by the following:
    </p>

    <EquationSolve
        equations={[equation1, equation2, equation3, equation4, equation5]}
        explanations={[
            "Our initial infinite sum we set equal to x",
            "Subtract 1 and multiply by 2 to remove one term from the infinite sum",
            "The right hand side is the same as the initial value of x, so we can substitute it in",
            "Distribute the 2 out",
            "Re-arrange to show the sum is equal to 2",
        ]}
    />
</Post>
{#snippet equation1()}
    <SimpleMaths equation="x=1+(1+(1+(1+[...])/2)/2)/2" />
{/snippet}
{#snippet equation2()}
    <SimpleMaths equation="2(x-1)=1+(1+(1+(1+[...])/2)/2)/2" />
{/snippet}
{#snippet equation3()}
    <SimpleMaths equation="2(x-1)=x" />
{/snippet}
{#snippet equation4()}
    <SimpleMaths equation="2x-2=x" />
{/snippet}
{#snippet equation5()}
    <SimpleMaths equation="x=2" />
{/snippet}

<style>
    .old-header {
        font-family: "old-font";
        font-size: 2.5em;
    }
    @font-face {
        font-family: "old-font";
        src: url("$lib/assets/fonts/canterbury.woff2");
    }
</style>
