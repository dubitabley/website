<script lang="ts">
    type QuoteProps = {
        quote: string,
        by: string,
        from: string | null,
    }

    let {
        quote,
        by,
        from
    }: QuoteProps = $props();
</script>

<style>
    .quote::before, .quote::after {
        content: "\"";
        display: inline-block;
        font-size: 30px;
    }

    .quote-wrapper {
        background-color: var(--background-color-2);
        padding: 10px;
        max-width: 400px;
        margin: 20px;
    }

    .quote-by {
        font-size: 20px;
    }
</style>

<div class="quote-wrapper">
    <div class="quote">
        {quote}
    </div>
    <div class="quote-by">
        - {by}
    </div>
    {#if from != null}
        <span>in `{from}`</span>
    {/if}
</div>