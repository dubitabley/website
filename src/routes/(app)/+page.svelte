<script lang="ts">
    import StarRating from "$lib/components/star-rating.svelte";
    import Books from "$lib/interests/books.json";
    import Quotes from "$lib/interests/quotes.json";
    import Songs from "$lib/interests/songs.json";

    const latestBook = Books.books[Books.books.length - 1];
    const latestQuote = Quotes.quotes[Quotes.quotes.length - 1];
    const latestSong = Songs.songs[Songs.songs.length - 1];
</script>

<style>

    #panel-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .panel {
        border: 5px double var(--primary-color);
        border-radius: 10px;
        padding: 10px;
        margin: 20px;
        width: 400px;
    }

    .text-bg {
        background-color: var(--background-color-2);
    }

    .panel-title {
        font-size: 30px;
    }
    
</style>

<div >
    Hello and welcome to dubitable's website!
    <br />
    Idk what to put here.
    <br />
    <a href="/about">About me</a>
    <br />
    Some things I'm interested in I guess:
</div>

<div id="panel-wrapper">
    <div class="panel text-bg">
        <span class="panel-title">Latest book</span>
        <div>
            <div>
                <span><b>Title:</b></span>
                <span>{latestBook.book_name}</span>
            </div>
            <div>
                <span><b>Author:</b></span>
                <span>{latestBook.author}</span>
            </div>
            <div>
                <span>Rating: </span>
                <StarRating rating={latestBook.rating} />
            </div>
            <div>
                <a href="/interests/books">All books</a>
            </div>
        </div>
    </div>

    <div class="panel text-bg">
        <span class="panel-title">Latest quote</span>
        <div>
            <div>
                <span><b>Quote:</b></span>
                <span>{latestQuote.quote}</span>
            </div>
            <div>
                <span>-</span>
                <span>{latestQuote.by}</span>
            </div>
            {#if latestQuote.from != null}
                <div>
                <span>from </span>
                <span>{latestQuote.from}</span>
            </div>
            {/if}
            <div>
                <a href="/interests/quotes">All quotes</a>
            </div>
        </div>
    </div>

    <div class="panel text-bg">
        <span class="panel-title">Latest song</span>
        <div>
            <div>
                <span><b>Title:</b></span>
                <span>{latestSong.song_name}</span>
            </div>
            <div>
                <span>sung by </span>
                <span>{latestSong.singer}</span>
            </div>
            <div>
                <a href="/interests/songs">All songs</a>
            </div>
        </div>
    </div>
</div>

