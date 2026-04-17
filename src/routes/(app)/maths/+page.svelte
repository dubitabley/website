<script lang="ts">
    import Maths from "$lib/interests/maths.json";
</script>

<h1>Mathematics!</h1>
<p>First of all, it's maths not math. Sorry Americans.</p>
<p>Here are my posts and notes on mathmatics:</p>
{#each Maths.maths_posts as mathPost}
    <div>
        <a href="/maths/{mathPost.link}"><h3>{mathPost.post_name}</h3></a>
        <p>
            {mathPost.description}
        </p>
    </div>
{/each}
