<script lang="ts">
    import type { PageProps } from "./$types";
    import Books from "$lib/interests/books.json";
    import StarRating from "$lib/components/star-rating.svelte";

    let { data }: PageProps = $props();
</script>

<h2 class="book-header">Books I've read</h2>
<div>This is what I do instead of using goodreads I guess.</div>
<br />
<div class="book-all">
    {#each Books.books.reverse() as book}
        <div class="book-info">
            <div class="main-book-info">
                <span>
                    {book.book_name}
                </span>
                <br />
                <span>by&nbsp;</span><span>{book.author}</span>
            </div>
            {#if book.rating}
                <StarRating rating={book.rating} />
            {/if}
            {#if book.link}
                <div>
                    <a href="./book/{book.link}">Go to review</a>
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    .book-header {
        text-align: center;
    }

    .book-all {
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
    }

    .main-book-info {
        min-width: 300px;
        margin-bottom: 10px;
    }

    .book-info {
        background-color: var(--background-color-2);
        padding: 20px;
        border: 4px inset var(--primary-color-2);
        margin-bottom: 4px;
    }
</style>
