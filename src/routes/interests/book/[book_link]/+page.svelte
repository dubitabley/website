<script lang="ts">
    import type { Component } from "svelte";
    import type { PageProps } from "./$types.js";
    import Quotes from "$lib/interests/quotes.json";

    let { 
        data,
    }: PageProps = $props();

    const bookInfo = data.bookInfo;

    let BookComponent: Component | null = $state(null);

    import(`$lib/interests/books/${bookInfo.link}.svelte`)
        .then(component => {
            BookComponent = component.default;
        })
        .catch(() => {});

    const bookQuotes = Quotes.quotes.filter(x => x.bookLink === bookInfo.link);
    
</script>

<style>
    .book-quote {
        padding: 10px;
        max-width: 400px;
        margin: 20px;
        background-color: var(--background-color-2);
        color: var(--primary-color-2);
    }
</style>

<span>
    <a href="/interests/books">Back to books</a>
</span>

<div>
    <h3>{bookInfo.book_name}</h3>
    <p>by {bookInfo.author}</p>
</div>

{#if BookComponent != null}
    <div>
        <BookComponent />
    </div>
{:else}
    <div>
        No notes on this book found
    </div>
{/if}

<div>
    <h2>
        Quotes from the book
    </h2>
    {#if bookQuotes.length > 0}
        {#each bookQuotes as bookQuote}
            <div class="book-quote">
                <span>
                    {bookQuote.quote}
                </span>
            </div>
        {/each}
    {:else}
        <div>
            No quotes for books noted.
        </div>
    {/if}
</div>
