<script lang="ts">
    import type { PageProps } from "./$types";
    import Words from "$lib/interests/words.json";

    let { data }: PageProps = $props();
</script>

<h2>Random words</h2>

<div>
    These are words that seem striking to me. Mostly they're just long/obscure.
</div>

<div>
    {#each Words.words as word}
        <div class="word-info">
            <p class="word">{word.word}</p>
            <a href="https://en.wiktionary.org/wiki/{word.word}"
                >Wiktionary link</a
            >
        </div>
    {/each}
</div>

<h2 id="bad-words">Bad words</h2>

<div>
    {#each Words.bad_words as badWord}
        <div class="bad-word-info">
            <p class="word">{badWord.word}</p>
            <p>{badWord.reason}</p>
            <a href="https://en.wiktionary.org/wiki/{badWord.word}"
                >Wiktionary link</a
            >
        </div>
    {/each}
</div>

<style>
    .bad-word-info {
        background-color: hsl(359, 95%, var(--primary-lightness));
        display: block;
        max-width: 400px;
    }

    .word-info {
        background-color: var(--background-color-2);
        display: block;
        padding: 2px;
        max-width: 400px;
        margin: 5px;
    }

    p {
        margin: 5px;
    }

    .word {
        text-align: center;
        font-size: 25px;
    }
</style>
