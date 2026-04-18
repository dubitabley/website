<!--
    @component Renders a single token via MathML
 -->
<script lang="ts">
    import { TokenType, type Token } from "../simple-maths";
    import MathToken from "./math-token.svelte"; // self import

    type Props = {
        token: Token;
    };

    let { token }: Props = $props();
</script>

{#snippet collapse(tokens: Token[])}
    {#if tokens.length === 1}
        <MathToken token={tokens[0]} />
    {:else if tokens.length > 1}
        <mrow>
            {#each tokens as token}
                <MathToken {token} />
            {/each}
        </mrow>
    {/if}
{/snippet}

{#if token.type === TokenType.Identifier}
    <mi>{token.identifier}</mi>
{:else if token.type === TokenType.Operator}
    <mo>{token.operator}</mo>
{:else if token.type === TokenType.Fraction}
    <mfrac>
        {@render collapse(token.numerator)}
        {@render collapse(token.denominator)}
    </mfrac>
{:else if token.type === TokenType.Exponent}
    <msup>
        <mrow>
            <MathToken token={token.base} />
        </mrow>
        {@render collapse(token.power)}
    </msup>
{:else if token.type === TokenType.Bracket}
    <mo>(</mo>
    {#each token.tokens as childToken}
        <MathToken token={childToken} />
    {/each}
    <mo>)</mo>
{:else if token.type === TokenType.Root}
    <mroot>
        {@render collapse(token.tokens)}
        {@render collapse(token.rootTokens)}
    </mroot>
{:else if token.type === TokenType.SquareRoot}
    <msqrt>
        {#each token.tokens as childToken}
            <MathToken token={childToken} />
        {/each}
    </msqrt>
{/if}
