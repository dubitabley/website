<script lang="ts">
    import type { Snippet } from "svelte";

    type AllFootnoteProps = {
        footnotes: Snippet[];
    };

    let { footnotes }: AllFootnoteProps = $props();
</script>

{#if footnotes.length > 0}
    <h4>Footnotes</h4>
    {#each footnotes as footnote, index}
        <div>
            <a href="#footnote-{index}">[{index}]</a> - {@render footnote()}
        </div>
    {/each}
{/if}
