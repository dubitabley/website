<script>
    import QuestionMark from "./misc/question-mark.svelte";
</script>

<div class="confusion-wrapper">
    <svg
        class="question-mark-svg"
        width="100mm"
        height="100mm"
        viewBox="0 0 100 100"
    >
        <g>
            <QuestionMark />
        </g>
    </svg>
</div>

<style>
    .confusion-wrapper {
        display: inline;
        padding: 2px;
    }

    .question-mark-svg {
        width: 20px;
        height: 20px;
    }
</style>
