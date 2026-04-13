<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        header: Snippet;
        /** The children elements */
        children: Snippet;
        /** A link to the review */
        link: string;
        /** Date of the review */
        date: string;
        /** The rating the review gives to the book */
        bookRating: number;
        /** My rating of the review */
        reviewRating: number;
    };

    let { header, children, link, date, bookRating, reviewRating }: Props =
        $props();
</script>

<div class="review">
    <h3>{@render header()}</h3>
    <p>
        <span>The review was on {date}.</span>
        <a href={link}>Link to the review</a>
    </p>
    <p>
        The review gives the book: {bookRating}/5 (my estimation)
    </p>
    <p>
        My rating of the review: {reviewRating}/5
    </p>
    {@render children()}
</div>

<style>
    .review {
        padding: 10px;
        background-color: hsl(10, 20%, var(--primary-lightness));
        margin-bottom: 20px;
    }
</style>
