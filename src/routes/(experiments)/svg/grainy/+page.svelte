<script lang="ts">
</script>

<h1>Grainy gradients</h1>
<p>
    Inspired by <a href="https://css-tricks.com/grainy-gradients/"
        >this article</a
    >
    and
    <a href="https://css-tricks.com/creating-patterns-with-svg-filters/"
        >this article</a
    > which use SVG filters to do interesting things.
</p>

<section>
    <p>Basic grainy gradient</p>
    <div class="size container">
        <div class="noise fill"></div>
        <div class="overlay fill"></div>
    </div>
</section>

<section>
    <p>Grainy text</p>
    <div class="noise-text">Swag text</div>
</section>

<section>
    <p>Dotty text</p>
    <div class="star-text">Dotty text</div>
</section>

<section>
    <p>
        idk - this one is adapted from <a
            href="https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap"
            >this MDN page.</a
        >
    </p>
    <div class="displacement size"></div>
</section>

<style>
    .size {
        width: 500px;
        height: 500px;
    }

    .noise {
        background:
            linear-gradient(to right, #0000ff55, #ff000055),
            url("$lib/assets/experiments/svg/grain-filter.svg");
    }

    .fill {
        grid-area: 1 / 1;
    }

    .container {
        display: grid;
    }

    .overlay {
        background-color: slateblue;
        mix-blend-mode: difference;
    }

    .noise-text {
        font-size: 80px;
        font-weight: bold;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        background-image:
            linear-gradient(to bottom, #dd3333aa, #33555555 90%),
            url("$lib/assets/experiments/svg/grain-filter.svg");
        filter: contrast(300%);
        background-clip: text;
        color: transparent;
    }

    .star-text {
        font-size: 80px;
        font-weight: bold;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        background-image: url("$lib/assets/experiments/svg/dotty-filter.svg");
        background-clip: text;
        color: transparent;
    }

    .displacement {
        background-image: url("$lib/assets/experiments/svg/displacement.svg");
        background-repeat: no-repeat;
    }
</style>
