<script lang="ts">
    import type { PageProps } from './$types';
    import Quote from "$lib/components/quote.svelte";
    import Quotes from "$lib/interests/quotes.json";

    let { data }: PageProps = $props();
</script>

<h2 class="quote-header">
    Interesting quotes
</h2>

<div class="quote-wrapper">
    {#each Quotes.quotes as quote}
        <Quote quote={quote.quote} by={quote.by} from={quote.from} />
    {/each}
</div>