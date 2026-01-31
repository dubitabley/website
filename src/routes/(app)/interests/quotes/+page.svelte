<script lang="ts">
    import type { PageProps } from "./$types";
    import Quote from "$lib/components/quote.svelte";
    import Quotes from "$lib/interests/quotes.json";
</script>

<h2 class="quote-header">Interesting quotes</h2>

<summary>
    Some quotes I noted down while reading books. (primarily, I may add quotes
    from other sources)
</summary>

<div class="all-quote-wrapper">
    {#each Quotes.quotes as quote}
        <Quote by={quote.by} from={quote.from}>
            <span>{quote.quote}</span>
        </Quote>
    {/each}
</div>
