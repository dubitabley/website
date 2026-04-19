<script lang="ts">
    import NumericalSeriesDemonstration from "$lib/components/maths/animations/numerical-series-demonstration.svelte";
    import { parseEquation } from "$lib/components/maths/equation/simple-maths";
    import SimpleMaths from "$lib/components/maths/equation/simple-maths.svelte";
    import EquationSolve from "$lib/components/maths/interactive/equation-solve.svelte";
    import Footnote from "$lib/components/post/footnote.svelte";
    import Post from "$lib/components/post/post.svelte";

    const baselFunction = (n: number) => {
        return 1 / n ** 2;
    };

    const funcDisplay = (n: number) => {
        return parseEquation(`1/${n}^2`);
    };
</script>

<Post>
    <h1>The Basel problem</h1>

    <p>
        Notes adapted from <a href="https://youtu.be/RMFt-9PzF54"
            >this youtube video</a
        >
    </p>

    <p>The following infinite series is called the Harmonic series.</p>
    <div>
        <SimpleMaths equation="1+1/2+1/3+1/4+1/5+[...]=[???]" />
    </div>
    <p>
        It's fairly well-known that this sum diverges, meaning that it doesn't
        ever converge to a value. The most famous proof of this fact is that you
        can group together elements such that each group is at least 1/2 and you
        can create an infinite number of these groups. Thus this sum will keep
        increasing and isn't interesting in this context so the next infinite
        sum you might want to look at is this one.
    </p>
    <div>
        <SimpleMaths equation="1+1/2^2+1/3^2+1/4^2+1/5^2=[...]=[???]" />
    </div>
    <p>
        This one seems interesting because you can't group them together in the
        same way and calculating it numerically seems to be getting closer to a
        value. The question of what it equalled was posed by <a
            href="https://en.wikipedia.org/wiki/Pietro_Mengoli"
            >Pietro Mengoli</a
        > in 1650.
    </p>
    <NumericalSeriesDemonstration funcValue={baselFunction} {funcDisplay} />
    <p>
        If you run this for a while, you can see it slowly starts to converge on
        a value that's higher than 1.6 but less than 1.7 but it's not easy to
        see exactly what value it is. If you skip ahead a bit it seems to be
        around 1.64 but even after hundreds of terms it's still changing so
        isn't going to be a useful way to get a precise numerical value;
        especially if you're Euler in the 18th century and don't have access to
        a computer. Therefore he devised a different method called the <a
            href="https://en.wikipedia.org/wiki/Euler%E2%80%93Maclaurin_formula#The_Basel_problem"
            >Euler–Maclaurin formula</a
        > to compute the sum to 20 decimal places.
    </p>
    <p>
        Using this, he was convinced the result of the equation should be <SimpleMaths
            equation="([pi]^2)/6"
        /> but to find a method to derive that was a little trickier. It was already
        known that the
        <a
            href="https://en.wikipedia.org/wiki/Taylor_series#Trigonometric_functions"
            >Taylor series</a
        > for sin(x) was as follows:
    </p>
    <div>
        <SimpleMaths
            equation="[sin]x = x - (x^3)/(3!) + (x^5)/(5!) - (x^7)/(7!) + [...]"
        />
        <p>Dividing through by x:</p>
        <SimpleMaths
            equation="([sin]x)/x = 1 - (x^2)/(3!) + (x^4)/(5!) - (x^6)/(7!) + [...]"
        />
        <p>
            Euler's idea was to factorise sin x as a product of terms and to
            show that the infinite sum we're looking at was part of the
            coefficient for <SimpleMaths equation="x^2" /> for <SimpleMaths
                equation="([sin]x)/x"
            />. Specifically that <SimpleMaths
                equation="([sin]x)/x = 1 - [sum]/([pi]^2)x^2 + [...]"
            /> and therefore since the <SimpleMaths equation="x^2" /> term should
            be the same for this method as the Taylor series, <SimpleMaths
                equation="-1/(3!) = -[sum]/[pi]^2"
            /> and with some basic rearranging that <SimpleMaths
                equation="[sum] = ([pi]^2)/6"
            />
        </p>
        <p>However how does that factorisation of sin x work?</p>
        <p>
            For finite equations we can form polynomials like <SimpleMaths
                equation="x(x-1)"
            /> which would be equal to 0 if x was either 0, or x was equal to 1. These
            are called the roots of the polynomial. The same thing would be true for
            something like <SimpleMaths equation="x(x-1)(x-2)" /> and we could multiply
            them out to get <SimpleMaths equation="x^3-3x^2+2x" />. Or <SimpleMaths
                equation="x(x-1)(x-2)(x-3)=-6x+11x^2-6x^3+x^4"
            /> and <SimpleMaths
                equation="x(x-1)(x-2)(x-3)(x-4)=24x-50x^2+35x^3-10x^4+x^5"
            />. Note that this gives coefficients for the x term of -6x and 24x
            but in the Taylor series we had x on its own. This is a problem if
            we want the two equations to be equal so in the polynomial we need
            to divide by n! or n factorial. <SimpleMaths
                equation="n!=1*2*...*(n-1)*n"
            /> We also have the problem that we get negatives when there's an odd
            number of brackets. This is relatively simple to solve if we just multiply
            each bracket by -1, which has the effect of swapping the order. Thus
            <SimpleMaths equation="1/(n!)x(1-x)(2-x)(3-x)[...](n-x)" /> will give
            us a root at 0, 1, 2, etc and the coefficient for x will just be positive
            x on its own, the same as the Taylor series.
        </p>
        <h4>Transforming these equations</h4>
        <p>
            Follow the next equation to see how we move the factorial inside the
            brackets for n=4
        </p>
        {#snippet factorialEquation1()}
            <SimpleMaths equation="1/(4!)x(1-x)(2-x)(3-x)(4-x)" />
        {/snippet}
        {#snippet factorialEquation2()}
            <SimpleMaths
                equation="1/1[middot]1/2[middot]1/3[middot]1/4[middot]x(1-x)(2-x)(3-x)(4-x)"
            />
        {/snippet}
        {#snippet factorialEquation3()}
            <SimpleMaths
                equation="x[middot]1/1(1-x)[middot]1/2(2-x)[middot]1/3(3-x)[middot]1/4(4-x)"
            />
        {/snippet}
        {#snippet factorialEquation4()}
            <SimpleMaths equation="x(1-x)(1-x/2)(1-x/3)(1-x/4)" />
        {/snippet}
        <EquationSolve
            equations={[
                factorialEquation1,
                factorialEquation2,
                factorialEquation3,
                factorialEquation4,
            ]}
            explanations={[
                "Our starting equation for n=4",
                "Expanding out the factorial",
                "Grouping the factorial expansions by each bracket",
                "Multiplying each value inside the bracket",
            ]}
        />
        <p>
            Euler was thinking what if we use this same method but for sin x.
            This is slightly strange because it's not necessarily valid to do
            for an infinite function in the same way as it is for a polynomial.
            Nevertheless, sometimes it's useful in mathematics to try things and
            justify them rigorously later.<Footnote
                >Note that this was shown later proven to be valid by the <a
                    href="https://en.wikipedia.org/wiki/Weierstrass_factorization_theorem"
                    >Weierstrass factorization theorem</a
                ></Footnote
            >
        </p>
        <p>
            The values of x for which <SimpleMaths equation="[sin]x=0" /> are when
            x is a multiple of π. So that's 0, π, 2π, 3π, ... but it's also -1π, -2π,
            -3π, .... So the factorisation of it must be <SimpleMaths
                equation="x(1-x/[pi])(1+x/[pi])(1-x/(2[pi]))(1+x/(2[pi]))(1-x/(3[pi]))(1+x/(3[pi]))[...]"
            /> Note that it must be 1 plus or minus value. To clean this up a bit
            we do the following, using the fact that <SimpleMaths
                equation="(a-b)(a+b)=a^2-b^2"
            /> - this is the
            <a href="https://en.wikipedia.org/wiki/Difference_of_two_squares"
                >difference of two squares.</a
            >
        </p>
        {#snippet sinEquation1()}
            <SimpleMaths
                equation="[sin]x=x(1-x/[pi])(1+x/[pi])(1-x/(2[pi]))(1+x/(2[pi]))(1-x/(3[pi]))(1+x/(3[pi]))[...]"
            />
        {/snippet}
        {#snippet sinEquation2()}
            <SimpleMaths
                equation="[sin]x=x(1-(x^2)/([pi]^2))(1-(x^2)/(4[pi]^2))(1-(x^2)/(9[pi]^2))[...]"
            />
        {/snippet}
        {#snippet sinEquation3()}
            <SimpleMaths
                equation="([sin]x)/x=(1-(x^2)/([pi]^2))(1-(x^2)/(4[pi]^2))(1-(x^2)/(9[pi]^2))[...]"
            />
        {/snippet}
        <EquationSolve
            equations={[sinEquation1, sinEquation2, sinEquation3]}
            explanations={[
                "Our equation for sin x",
                "Using the fact above for the difference of two squares",
                "Dividing both sides by x",
            ]}
        />
        <p>
            We want to multiply out this product to get the coefficients for
            each term. The term with no x's is just all the 1s in the brackets
            multiplied together, which will just be 1. Since all the x's are
            squared, there can't be an x term. The <SimpleMaths
                equation="x^2"
            /> term would be selecting a 1 from every term in the product except for
            one term which is <SimpleMaths equation="-(x^2)/(n^2[pi]^2)" /> for every
            n. Thus the total amount for this coefficient is <SimpleMaths
                equation="-1/([pi]^2)-1/(4[pi]^2)-1/(9[pi]^2)-[...]"
            />. We can extract <SimpleMaths equation="-1/([pi]^2)" /> from this to
            get <SimpleMaths equation="-1/([pi]^2)(1+1/4+1/9+[...])" /> which gives
            us our sum we were looking at before! This <SimpleMaths
                equation="([sin]x)/x=1-1/([pi]^2)([sum])x^2+[...]"
            />
        </p>
        <p>
            Finally since this should be the same as the Taylor series from
            earlier, the coefficients should be the same for each term, so <SimpleMaths
                equation="-1/(3!) = -[sum]/[pi]^2"
            /> which is fairly simple to rearrange to get the <SimpleMaths
                equation="([pi]^2)/6"
            /> we're after.
        </p>
    </div>
</Post>
