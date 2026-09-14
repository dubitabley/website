<script lang="ts">
    import SimpleMaths from "$lib/components/maths/equation/simple-maths.svelte";
    import GraphPolynomial from "$lib/components/maths/graphs/graph-polynomial.svelte";
    import Graph from "$lib/components/maths/graphs/graph.svelte";
    import EquationSolve from "$lib/components/maths/interactive/equation-solve.svelte";
    import SvgAnim from "$lib/components/maths/svg-anim/svg-anim.svelte";
    import Footnote from "$lib/components/post/footnote.svelte";
    import Post from "$lib/components/post/post.svelte";
    import NewtonRaphsonDemonstration from "./newton-raphson-demonstration.svelte";

    const simpleCoefficients = [1, 0.3, 2.3, -0.5];
    const simpleDerivativeCoefficients =
        getDerivativeCoefficients(simpleCoefficients);
    const firstGuess = 5;
    const guessValue = calculateFromCoefficients(
        firstGuess,
        simpleCoefficients,
    );
    const guessDerivativeValue = calculateFromCoefficients(
        firstGuess,
        simpleDerivativeCoefficients,
    );
    const adjustedGuess = firstGuess - guessValue / guessDerivativeValue;
    const adjustedGuess2 =
        adjustedGuess -
        calculateFromCoefficients(adjustedGuess, simpleCoefficients) /
            calculateFromCoefficients(
                adjustedGuess,
                simpleDerivativeCoefficients,
            );

    function calculateFromCoefficients(
        x: number,
        coefficients: number[],
    ): number {
        let value = 0;
        for (let i = 0; i < coefficients.length; i++) {
            const coefficient = coefficients[i];
            value += coefficient * x ** i;
        }
        return value;
    }

    function getDerivativeCoefficients(coefficients: number[]): number[] {
        if (coefficients.length <= 1) {
            return [];
        }
        const derivativeCoefficients = [];
        for (let i = 1; i < coefficients.length; i++) {
            // i = 1 => second coefficient so 3x would multiply by 1 to get 3
            // i = 2 => third coefficient so 6x^2 would multiply by 2 to get 12
            derivativeCoefficients.push(coefficients[i] * i);
        }
        return derivativeCoefficients;
    }
</script>

<Post>
    <h1>Newton-Raphson Method</h1>
    <p>
        Trying to discuss the Newton-Raphson Method so that I understand it
        better. Note that it's also called Newton's method but I believe Newton
        has enough notoriety and it's good to give Joseph Raphson some credit.
    </p>

    <h3>How to use it?</h3>

    <p>
        The Newton-Raphson algorithm is a way to approximate the root(zero) for
        a function. It requires knowing the formula for a function and its
        derivative. Thus let's take an example: <SimpleMaths
            equation="f(x) = {simpleCoefficients[3]}x^3+{simpleCoefficients[2]}x^2+{simpleCoefficients[1]}x+{simpleCoefficients[0]}"
        />
    </p>

    <figure>
        <Graph dims={{ left: -2, top: 10, right: 10, bottom: -2 }}>
            <GraphPolynomial coefficients={simpleCoefficients} />
        </Graph>
        <figcaption>The graph for that equation</figcaption>
    </figure>

    <p>
        Let's try to find the value for that root in the image where the graph
        crosses the x-axis. Let's make a guess that the root is {firstGuess},
        there are ways of automatically finding a decent guess but this is a
        simple start. The derivative of the function is simple to calculate as
        <SimpleMaths
            equation="f'(x) = {simpleDerivativeCoefficients[2]}x^2+{simpleDerivativeCoefficients[1]}x+{simpleDerivativeCoefficients[0]}"
        />. Our step is to use the formula <SimpleMaths
            equation="x1=x0-(f(x0))/(f'(x0))"
        /> and the idea is that x1 will be closer to the root than x0. So in our example.
    </p>
    {#snippet simpleNewtonRaphson1()}
        <SimpleMaths equation="x1=x0-(f(x0))/(f'(x0))" />
    {/snippet}
    {#snippet simpleNewtonRaphson2()}
        <SimpleMaths
            equation="x1={firstGuess}-(f({firstGuess}))/(f'({firstGuess}))"
        />
    {/snippet}
    {#snippet simpleNewtonRaphson3()}
        <SimpleMaths
            equation="x1={firstGuess}-({guessValue})/({guessDerivativeValue})"
        />
    {/snippet}
    {#snippet simpleNewtonRaphson4()}
        <SimpleMaths equation="x1={adjustedGuess}" />
    {/snippet}
    <EquationSolve
        equations={[
            simpleNewtonRaphson1,
            simpleNewtonRaphson2,
            simpleNewtonRaphson3,
            simpleNewtonRaphson4,
        ]}
        explanations={[
            "Our equation to begin with",
            "Substituting our guess in",
            "Calculating the values for the function and derivative",
            "Final value",
        ]}
    />
    <p>
        This gives us the value {adjustedGuess.toFixed(4)} as a better estimate for
        the root. We can iteratively continue doing this to get the next guess {adjustedGuess2.toFixed(
            4,
        )}. The actual value is ~4.81112<Footnote
            >Note that I got this from just putting it into WolframAlpha.</Footnote
        > so this is quite a good estimate.
    </p>

    <h3>Why does this work?</h3>

    <p>
        A natural way of understanding this is as estimating the value by
        finding the root of the straight tangent line of the curve at the point
        where you made your guess.
    </p>
    <NewtonRaphsonDemonstration />

    <h3>How was it discovered?</h3>

    <p>Sources:</p>
    <ul>
        <li>
            <a href="https://www.kenkoonwong.com/blog/newton-raphson/"
                >https://www.kenkoonwong.com/blog/newton-raphson/</a
            >
        </li>
        <li>
            <a href="https://en.wikipedia.org/wiki/Newton's_method"
                >https://en.wikipedia.org/wiki/Newton's_method</a
            >
        </li>
    </ul>
</Post>
