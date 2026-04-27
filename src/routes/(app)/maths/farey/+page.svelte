<script lang="ts">
    import SimpleMaths from "$lib/components/maths/equation/simple-maths.svelte";
    import { constructFarey } from "$lib/components/maths/farey/farey";
    import FareyGraphSunburst from "$lib/components/maths/farey/farey-graph-sunburst.svelte";
    import EquationSolve from "$lib/components/maths/interactive/equation-solve.svelte";

    let fareyN = $state(4);
    let fareyEq = $derived.by(() => {
        const fareyString = constructFarey(fareyN)
            .map((f) => `${f[0]}/${f[1]}`)
            .join(",");
        return `F\\sub${fareyN}=${fareyString}`;
    });
</script>

<h1>Farey Sequences</h1>

<p>
    Adapted from "Chapter III: Farey Series and a theorem of Minkowski" in the
    book "An Introduction to the Theory of Numbers, Sixth Edition" by G.H. Hardy
    and E.M.Wright.
</p>
<p>
    Note that the book calls it a series but <a
        href="https://en.wikipedia.org/wiki/Farey_sequence">Wikipedia says</a
    > "A Farey sequence is sometimes called a Farey series, which is not strictly
    correct, because the terms are not summed." so I will call it a sequence.
</p>

<h4>What is a Farey Sequence?</h4>

<p>
    A Farey Sequence F<sub>n</sub> is the ascending irreducible fractions
    between 0 and 1 where the denominators are less than or equal to n. For
    example to construct F<sub>4</sub> we can get all the fractions with denominator
    &leq; 4:
</p>
<div>
    <SimpleMaths
        equation="0/4,1/4,2/4,3/4,4/4;0/3,1/3,2/3,3/3;0/2,1/2,2/2;0/1,1/1"
    />
    <p>
        Obviously there's a bunch of duplicates here: all the fractions equal to
        zero or one are the same as each other, there's also <SimpleMaths
            equation="2/4=1/2"
        />. We also need them to be in ascending order, so therefore the proper
        Farey Sequence for F<sub>4</sub> is the following:
    </p>
    <SimpleMaths equation="F\sub4=0/1,1/4,1/3,1/2,2/3,3/4,1/1" />
</div>

<p>
    Graphing this, using the y-axis as the denominator and the x-axis as the
    numerator and then reflecting it across the diagonal you can form little
    shapes like so:
</p>

<div>
    <h3>F<sub>{fareyN}</sub></h3>
    <FareyGraphSunburst n={fareyN} reflect={true} />
    <div>
        <label>
            Farey n:
            <input type="range" min="1" max="20" bind:value={fareyN} />
        </label>
    </div>
    <p>
        <SimpleMaths equation={fareyEq} />
    </p>
</div>

<div>
    Some properties of a Farey Sequence:
    <p>
        If a/b and c/d are successive terms of F<sub>n</sub> then <SimpleMaths
            equation="b+d>n"
        />. The
        <a href="https://en.wikipedia.org/wiki/Mediant_(mathematics)">mediant</a
        >
        of the fractions is <SimpleMaths equation="(a+c)/(b+d)" /> and we know it
        will always be in between the other two like so: <SimpleMaths
            equation="a/c<(a+b)/(c+d)<b/d"
        /> this is because(from the Wikipedia page for mediant) <SimpleMaths
            equation="(a+b)/(c+d)-a/c=(bc-ad)/(c(c+d))=d(c+d)(b/d-a/c)"
        /> and since b/d > a/c this will always be positive so we know the mediant
        is greater than a/c and <SimpleMaths
            equation="b/d-(a+b)/(c+d)=(bc-ad)/(d(c+d))=c/(c+d)(b/d-a/c)"
        /> which will also be positive for the same reason so the mediant is less
        than b/d. It might be more intuitive if we look at an example, using 1/2 and
        2/3. <SimpleMaths equation="(1+2)/(2+3)=3/5" /> which is in between the two
        numbers. You can kind of think of it as smooshing the 2 numbers together and
        getting something in between. The significance of this property for us is
        that the denominator of the mediant is b+d and if it was less than or equal
        to n then it would be in F<sub>n</sub> but since these are successive terms
        it can't be, so b+d must be greater than n.
    </p>
    <p>
        If n > 1, then all successive terms of F<sub>n</sub> have differing
        denominators. Obviously for n = 1, we would have 0/1 and 1/1 in
        sequence, but for any other n we can't have a/b and c/b as successive
        terms since a+1&leq;c&lt;b and <SimpleMaths
            equation="a/b<a/(b-1)<(a+1)/b≤c/b"
        />. So e.g. for 1/3 and 2/3 for F<sub>4</sub> they can't be successive since
        1/2 comes in between.
    </p>
    <p>
        If a/b and c/d are successive terms of F<sub>n</sub> then we have
        <SimpleMaths equation="bc-ad=1" />
    </p>
    <p>
        e.g. for F<sub>4</sub> we have 1/2 followed by 2/3 so we get <SimpleMaths
            equation="2*2-3*1=1"
        />
    </p>
    <p>
        Additionally, if a/b, c/d and e/f are three successive terms of F<sub
            >n</sub
        >
        then we have <SimpleMaths equation="c/d=(a+e)/(b+f)" />
    </p>
    <p>
        e.g. for F<sub>4</sub> we have 1/2, 2/3 and 3/4 successively so <SimpleMaths
            equation="2/3=(1+3)/(2+4)"
        />
    </p>

    To prove these last two we first show that the two statements are equivalent
    to each other. If we assume <SimpleMaths equation="bc-ad=1" /> then for three
    successive equations we can form <SimpleMaths equation="de-cf=1" /> as well. Now
    we want to get equations for c and d without each other so we do the following:
    {#snippet equationc1()}
        <SimpleMaths equation="d=(1+bc)/a" />
    {/snippet}
    {#snippet equationc2()}
        <SimpleMaths equation="cf-(e+bce)/a=1" />
    {/snippet}
    {#snippet equationc3()}
        <SimpleMaths equation="acf-e-bce=a" />
    {/snippet}
    {#snippet equationc4()}
        <SimpleMaths equation="c(af-bc)=a+e" />
    {/snippet}
    <EquationSolve
        equations={[equationc1, equationc2, equationc3, equationc4]}
        explanations={[
            "Putting d equal to the rest of an equation to substitute it in",
            "This is the other equation with that d equation substituted in",
            "Multiplying both sides by a, note the negative is distributed as well",
            "Cleaning up a little for c",
        ]}
    />

    <span>If we do a similar thing for d</span>
    {#snippet equationd1()}
        <SimpleMaths equation="c=(ad-1)/b" />
    {/snippet}
    {#snippet equationd2()}
        <SimpleMaths equation="(f(ad-1))/b-de=1" />
    {/snippet}
    {#snippet equationd3()}
        <SimpleMaths equation="adf-f-bde=b" />
    {/snippet}
    {#snippet equationd4()}
        <SimpleMaths equation="d(af-be)=b+f" />
    {/snippet}
    <EquationSolve
        equations={[equationd1, equationd2, equationd3, equationd4]}
        explanations={[
            "Putting c equal to the rest of an equation to substitute it in",
            "This is the other equation with that c equation substituted in",
            "Multiplying both sides by b and distributing f out",
            "Cleaning up a little for d",
        ]}
    />
    And if we put our first equation over the other equation we get <SimpleMaths
        equation="c/d=(a+e)/(b+f)"
    /> as expected.
    <p>
        To prove they're equivalent we need to prove it goes the other way as
        well. i.e. a implies b and b implies a. Thus if we assume <SimpleMaths
            equation="c/d=(a+e)/(b+f)"
        /> is true then we can show this means the other equation must be true by
        induction. To prove something by induction means to prove something is true
        for a specific case then prove that if it's true for a certain case it will
        be true for the next case. This is useful for us because if <SimpleMaths
            equation="bc-ad=1"
        /> then we can do the following:
    </p>
    {#snippet equationIn1()}
        <SimpleMaths equation="c/d=(a+e)/(b+f)" />
    {/snippet}
    {#snippet equationIn2()}
        <SimpleMaths equation="bc+cf=ad+de" />
    {/snippet}
    {#snippet equationIn3()}
        <SimpleMaths equation="de-cf=bc-ad" />
    {/snippet}
    {#snippet equationIn4()}
        <SimpleMaths equation="de-cf=1" />
    {/snippet}
    <EquationSolve
        equations={[equationIn1, equationIn2, equationIn3, equationIn4]}
        explanations={[
            "Our initial equation",
            "Multiplying out by b+f and d to remove denominators",
            "Re-arrange to get bc-ad together",
            "Substitute to get the second equation that we want",
        ]}
    />
    <p>
        The base case is evident since the first two elements for any F<sub
            >n</sub
        >
        will be 0/1 and 1/n and <SimpleMaths equation="1*1-0*n=1" />
        Thus we have shown that the two equations are equivalent to each other but
        we have still yet to prove they're true.
    </p>
    <p>
        To do this, we will also use induction; this time using F<sub>n-1</sub>
        to F<sub>n</sub> as the inductive case. It's obviously true for n = 1 as
        the base case. Suppose that a/b and e/f are consecutive for F<sub
            >n-1</sub
        >
        but for F<sub>n</sub> they're separated by c/d. If we set <SimpleMaths
            equation="ad-bc=r"
        /> and <SimpleMaths equation="cf-de=s" />
        then we can do the following, remembering that <SimpleMaths
            equation="af-be=1"
        /> from F<sub>n-1</sub>
    </p>
    {#snippet equationp1()}
        <SimpleMaths equation="ad-bc=r" />
    {/snippet}
    {#snippet equationp2()}
        <SimpleMaths equation="d=(bc+r)/a" />
    {/snippet}
    {#snippet equationp3()}
        <SimpleMaths equation="cf-e(bc+r)/a=s" />
    {/snippet}
    {#snippet equationp4()}
        <SimpleMaths equation="acf-bce-er=as" />
    {/snippet}
    {#snippet equationp5()}
        <SimpleMaths equation="c(af-be)=as+er" />
    {/snippet}
    {#snippet equationp6()}
        <SimpleMaths equation="c=as+er" />
    {/snippet}
    <EquationSolve
        equations={[
            equationp1,
            equationp2,
            equationp3,
            equationp4,
            equationp5,
            equationp6,
        ]}
        explanations={[
            "Our starting equation for r",
            "Re-arranging to be equal to d",
            "Substituting d into the other equation for s",
            "Distribute values out",
            "Move things around to have c on its own",
            "Since af-be=1 since that comes from the inductive process",
        ]}
    />
    <p>
        We can do a similar thing for d to get <SimpleMaths
            equation="d=bs+fr"
        /> so that we can form <SimpleMaths equation="c/d=(as+er)/(bs+fr)" />.
        What values of r and s can work for this? They have to be greater than
        zero since otherwise it would just be equal to a/b or e/f and wouldn't
        be separate for the Farey Sequence. To be a new value in F<sub>n</sub>
        it must be the smallest possible value otherwise and so it must be r=s=1,
        and thus c/d is the mediant of the other two. Thus, <SimpleMaths
            equation="c/d=(a+e)/(b+f)"
        />. As an example, for 2/3 and 1/1 in F<sub>n</sub>, <SimpleMaths
            equation="c/d=(2s+1r)/(3s+1r)"
        /> since this is a new value that was just added to F<sub>n</sub> and is
        in between two values that were in F<sub>n-1</sub>, if s or r were
        greater than 1 then the value for r=s=1 would've already been included
        in F<sub>n-1</sub> and 2/3 and 1/1 wouldn't be successive in F<sub
            >n</sub
        >
    </p>
    <p>
        This is a bit handwavy and I don't formalise it much but there are other
        proofs given in the book chapter I'm basing this off which I may return
        to.
    </p>
</div>
