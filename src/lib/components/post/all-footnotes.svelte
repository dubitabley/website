<script lang="ts">
    import type { Snippet } from "svelte";

    type AllFootnoteProps = {
        footnotes: Snippet[];
    };

    let { footnotes }: AllFootnoteProps = $props();
</script>

<h4>Footnotes</h4>
{#each footnotes as footnote, index}
    <div>
        [{index}] - {@render footnote()}
    </div>
{/each}
