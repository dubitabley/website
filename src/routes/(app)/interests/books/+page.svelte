<script lang="ts">
    import type { PageProps } from "./$types";
    import Books from "$lib/interests/books.json";
    import StarRating from "$lib/components/star-rating.svelte";
    import ConfusionRating from "$lib/components/confusion-rating.svelte";
    import BookRatingExplanation from "$lib/components/books/book-rating-explanation.svelte";

    let { data }: PageProps = $props();
</script>

<h2 class="book-header">Books I've read</h2>
<p>This is what I do instead of using goodreads I guess.</p>
<BookRatingExplanation />
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
                <div class="rating-wrapper">
                    <StarRating rating={book.rating} />
                </div>
            {/if}
            {#if book.confusion}
                <div class="rating-wrapper">
                    <ConfusionRating amount={book.confusion} />
                </div>
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
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .book-info {
        background-color: var(--background-color-2);
        padding: 20px;
        border: 4px inset var(--primary-color-2);
        margin-bottom: 4px;
    }

    .rating-wrapper {
        padding: 2px;
    }
</style>
