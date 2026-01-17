<script lang="ts">
    import Confusion from "./confusion.svelte";

    type ConfusionRatingProps = {
        amount: number;
    };

    let { amount }: ConfusionRatingProps = $props();
</script>

<div class="confusion-wrapper">
    {#each { length: amount }}
        <Confusion />
    {/each}
</div>

<style>
    .confusion-wrapper {
        display: inline;
    }
</style>
