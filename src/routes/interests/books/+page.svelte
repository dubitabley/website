<script lang="ts">
    import type { PageProps } from './$types';
    import Books from "$lib/interests/books.json";

    let { data }: PageProps = $props();
</script>

<style>
    .book-header {
        text-align: center;
    }

    .book-all {
        display: inline-flex;
        flex-direction: column;
    }

    .book-info {
        background-color: var(--background-color-2);
        padding: 20px;
    }
</style>

<h2 class="book-header">
    Books I've read
</h2>
<div>
    This is what I do instead of using goodreads I guess.
</div>
<br />
<div class="book-all">
    {#each Books.books as book}
        <div class="book-info">
            <span>
                {book.book_name}
            </span>
            <br />
            <span>by&nbsp;</span><span>{book.author}</span> 
            {#if book.link}
                <div>
                    <a href="./book/{book.link}">Go to review</a>
                </div>
            {/if}
        </div>
    {/each}
</div>