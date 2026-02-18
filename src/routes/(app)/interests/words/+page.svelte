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
            <a
                class="wiktionary-link"
                href="https://en.wiktionary.org/wiki/{word.word}"
            >
                <img
                    class="wiktionary-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Wiktionary-logo-en-v2.svg/1024px-Wiktionary-logo-en-v2.svg.png"
                    alt="Wiktionary link"
                    title="Link to the wiktionary page for {word.word}"
                />
            </a>
        </div>
    {/each}
</div>

<h2 id="bad-words">Bad words</h2>

<div>
    {#each Words.bad_words as badWord}
        <div class="bad-word-info">
            <div>
                <p class="word">{badWord.word}</p>
                <p>{badWord.reason}</p>
            </div>

            <a
                class="wiktionary-link"
                href="https://en.wiktionary.org/wiki/{badWord.word}"
            >
                <img
                    class="wiktionary-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Wiktionary-logo-en-v2.svg/1024px-Wiktionary-logo-en-v2.svg.png"
                    alt="Wiktionary link"
                    title="Link to the wiktionary page for {badWord.word}"
                />
            </a>
        </div>
    {/each}
</div>

<style>
    .bad-word-info,
    .word-info {
        padding: 2px;
        max-width: 400px;
        margin: 5px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .bad-word-info {
        background-color: hsl(359, 95%, var(--primary-lightness));
    }

    .word-info {
        background-color: var(--background-color-2);
    }

    .wiktionary-icon {
        width: 50px;
        height: 50px;
        background-color: var(--primary-color-2);
    }

    p {
        margin: 5px;
    }

    .word {
        text-align: center;
        font-size: 25px;
        align-self: center;
        width: 100%;
    }
</style>
