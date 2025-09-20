<script lang="ts">
    import Star from "./star.svelte";

    const MAX_RATING = 5;

    type StarRatingProps = { 
        rating: number
    };

    const {
        rating
    }: StarRatingProps = $props();
</script>

<style>
    .rating-wrapper {
        display: inline;
    }
</style>

<div class="rating-wrapper">
    {#each { length: MAX_RATING }, index }
        {#if index < rating}
            <Star enabled={true} />
        {/if}
    {/each}
</div>