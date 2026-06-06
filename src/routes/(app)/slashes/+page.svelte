<script>
    import PageCard from "./page-card.svelte";
</script>

<h1>Slash Pages</h1>

<p>
    See <a href="https://slashpages.net/">slashpages.net</a> to see the explanation
    for these pages but this is a collection of some common pages on this website.
</p>

<div class="slash-cards-wrapper">
    <PageCard pageName="about">
        <p>
            A section about me, although I will admit it is somewhat facetious.
        </p>
    </PageCard>
    <PageCard pageName="now">
        <p>What I'm up to now, if I can remember to update it.</p>
    </PageCard>
    <PageCard pageName="blogroll">
        <p>
            This is a redirect to /cool-sites, a list of sites that I think you
            should check out.
        </p>
    </PageCard>
    <PageCard pageName="colophon">
        <p>About the technology to build this website.</p>
    </PageCard>
    <PageCard pageName="feeds">
        <p>About the RSS feeds for this website.</p>
    </PageCard>
    <PageCard pageName="uses">
        <p>Some technology used in this website.</p>
    </PageCard>
    <PageCard pageName="pfp">
        <p>
            Historical profile pictures. This one is styled differently since
            it's in the experimental part of the site.
        </p>
    </PageCard>
    <PageCard pageName="slashes">
        <p>The page you're on currently!</p>
    </PageCard>
</div>

<style>
    .slash-cards-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;

        @media (width < 500px) {
            grid-template-columns: 1fr;
        }
    }
</style>
