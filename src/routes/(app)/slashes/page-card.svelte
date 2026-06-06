<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        /** The inside of the card */
        children: Snippet;
        /** The slash page this card is for */
        pageName: string;
    };

    let { children, pageName }: Props = $props();
</script>

<div class="page-card">
    <h3 class="slash-link"><a href="/{pageName}">/{pageName}</a></h3>
    <div>
        {@render children()}
    </div>
</div>

<style>
    .page-card {
        border: 0.2em solid var(--primary-color);
        padding: 0.5em;
        border-radius: 1em;

        .slash-link {
            text-align: center;
            font-size: 2em;
            margin: 0.4em 0;
        }
    }
</style>
