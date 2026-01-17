<script lang="ts">
    type QuoteProps = {
        quote: string;
        by: string;
        from: string | null;
    };

    let { quote, by, from }: QuoteProps = $props();
</script>

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

<style>
    .quote::before,
    .quote::after {
        content: '"';
        display: inline-block;
        font-size: 40px;
        line-height: 23px;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
        vertical-align: bottom;
    }

    .quote {
        padding: 5px;
        background-color: hsl(210 15% var(--primary-lightness));
        transform: skew(3deg);
    }

    .quote-wrapper {
        background-color: var(--background-color-2);
        padding: 10px;
        max-width: 400px;
        margin: 20px;

        &:nth-child(even) .quote {
            transform: skew(-3deg);
        }
    }

    .quote-by {
        font-size: 20px;
        text-align: right;
        margin-bottom: 20px;
    }
</style>
