<!--
    @component
    A simple component that parses a maths expression and outputs MathML
 -->
<script lang="ts">
    import MathToken from "./mathml/math-token.svelte";
    import { parseEquation } from "./simple-maths";

    type Props = {
        equation: string;
    };

    let { equation }: Props = $props();
    let mathTokens = $derived(parseEquation(equation));
</script>

<math class="maths">
    {#each mathTokens as token}
        <MathToken {token} />
    {/each}
</math>

<style>
    .maths {
        font-family: math;
    }
</style>
