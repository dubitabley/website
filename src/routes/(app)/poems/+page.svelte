<script lang="ts">
    import Poems from "$lib/interests/poems.json";
</script>

<h2>Poems</h2>

<p>
    Rambles about poetry. I'm unfortunately not very cultured so we'll see if we
    have T.S. Eliot poetry or something else.
</p>

<div>
    {#each Poems.poems as poem}
        <div>
            <a href="/poems/{poem.link}"><h4>{poem.name}</h4></a>
        </div>
    {/each}
</div>
