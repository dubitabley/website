<script lang="ts">
    import NumericalSeriesDemonstration from "$lib/components/maths/animations/numerical-series-demonstration.svelte";
    import { parseEquation } from "$lib/components/maths/equation/simple-maths";
    import SimpleMaths from "$lib/components/maths/equation/simple-maths.svelte";
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
        /> but to find a method to derive that was a little trickier.
    </p>
</Post>
