<script lang="ts">
    import Misc from "$lib/interests/misc.json";
</script>

<div class="misc-brief">
    Various pages on this site that don't fit anywhere else. They aren't really
    posts; just things that tickle my fancy.
</div>

<h2>Misc pages</h2>

<div class="misc-wrapper">
    {#each Misc.pages as miscPage}
        <div class="misc-page">
            <h3>{miscPage.page_name}</h3>
            <div>
                <p>
                    {miscPage.summary}
                </p>
                <a href={miscPage.link}>Link</a>
            </div>
        </div>
    {/each}
</div>

<style>
    .misc-page {
        border: 10px ridge var(--primary-color-2);
        background-color: var(--background-color-2);
        padding: 10px;
        margin-bottom: 10px;
    }
</style>
