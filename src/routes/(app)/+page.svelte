<script lang="ts">
    import StarRating from "$lib/components/star-rating.svelte";
    import Books from "$lib/interests/books.json";
    import Quotes from "$lib/interests/quotes.json";
    import Songs from "$lib/interests/songs.json";
    import Words from "$lib/interests/words.json";
    import Poems from "$lib/interests/poems.json";
    import Posts from "$lib/interests/posts.json";

    function getLatest<T>(array: T[]): T {
        return array[array.length - 1];
    }

    const latestBook = getLatest(Books.books);
    const latestQuote = getLatest(Quotes.quotes);
    const latestSong = getLatest(Songs.songs);
    const latestWord = getLatest(Words.words);
    const latestPoem = getLatest(Poems.poems);
    const latestPost = getLatest(Posts.posts);
</script>

<div class="summary">
    Hello and welcome to dubitable's website!
    <br />
    Idk what to put here.
    <br />
    <a href="/about">About me</a>
    <br />
    <a href="/socials">Socials</a>
    <br />
    Some things I'm interested in I guess:
</div>

<div id="panel-wrapper">
    <div class="panel text-bg">
        <span class="panel-title">Latest web log</span>
        <div>
            <div>
                <a href="./posts/{latestPost.link}">{latestPost.summary}</a>
            </div>
            <div>
                <a href="./posts">All posts</a>
            </div>
        </div>
    </div>

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

    <div class="panel text-bg">
        <span class="panel-title">Latest poem</span>
        <div>
            <span><b>Poem name:</b></span>
            <span>{latestPoem.name}</span>
        </div>
        <div>
            <span><a href="/poems/{latestPoem.link}">Link to poem</a></span>
        </div>
    </div>

    <div class="panel text-bg">
        <span class="panel-title">Latest word</span>
        <div>
            <div>
                <span><b>Word:</b></span>
                <span>{latestWord.word}</span>
            </div>
            <div>
                <a href="/interests/words">All words</a>
            </div>
        </div>
    </div>
</div>

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

    .summary {
        padding-left: 20px;
    }
</style>
