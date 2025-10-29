<script lang="ts">
    import Posts from "$lib/interests/posts.json";
</script>

<div class="post-brief">
    An outpouring of my thoughts that transfer from the medium of my brain into
    words on this website. I am not using the word "blog" because I think it's
    cool not to at this point: the neologism has outgrown its etymology. I write
    these texts (I don't have a more extravagant word for what they are) for
    myself; primarily to practise writing and expounding my thoughts into
    coherent arguments. Feel free to not read them. If you wish to discuss or
    comment on anything I write, please don't. :)
</div>

<h2>Posts</h2>

<div class="post-wrapper">
    {#each Posts.posts as post}
        <div class="post">
            <h3>{post.name}</h3>
            <div>
                <a href="./posts/{post.link}">{post.summary}</a>
            </div>
        </div>
    {/each}
</div>

<style>
    .post {
        border: 5px dashed var(--primary-color-2);
        --inset-amount: 18px;
        clip-path: polygon(
            var(--inset-amount) 0px,
            calc(100% - var(--inset-amount)) 0%,
            100% var(--inset-amount),
            100% calc(100% - var(--inset-amount)),
            calc(100% - var(--inset-amount)) 100%,
            var(--inset-amount) 100%,
            0px calc(100% - var(--inset-amount)),
            0px var(--inset-amount)
        );
        background-color: var(--background-color-2);
        padding: 10px;
    }
</style>
