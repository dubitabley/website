<script lang="ts">
    import type { PageProps } from './$types';
    import Words from "$lib/interests/words.json";

    let { data }: PageProps = $props();
</script>

<style>
    .word-info {
        background-color: var(--background-color-2);
        display: block;
        padding: 20px;
        max-width: 400px;
        margin: 20px;
    }

    .word {
        text-align: center;
        font-size: 25px;
    }
</style>

<h2>
    Random words
</h2>

<div>
    These are words that seem striking to me. 
    Mostly they're just long/obscure.
</div>

<div>
    {#each Words.words as word}
        <div class="word-info">
            <p class="word">{word.word}</p>
            <a href="https://en.wiktionary.org/wiki/{word.word}">Wiktionary link</a>
        </div>        
    {/each}
</div>