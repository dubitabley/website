<script lang="ts">
    import Footnote from "$lib/components/post/footnote.svelte";
    import Post from "$lib/components/post/post.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<Post>
    <h2>I love the web</h2>

    <h5>Or at least I love the idea of the web.</h5>

    <p>
        This is a love letter to what the web was meant to be. At least in my
        head. In my mind the internet or world wide web
        <Footnote>
            They're not the same thing but I will use them synonymously at
            points.
        </Footnote>
        was supposed to be a parallel world from the real one where people could learn,
        share, live and enjoy engaging and interactive experiences. That sounds like
        a vacant platitude to me writing it but it's hard to articulate using more
        specific details. However, now I would say that this is mostly nostalgia,
        or perhaps nostalgia for a future that never was but I do think there was
        something more there. Perhaps being unable to articulate a vision of what
        the internet should be and who it should serve is a reason why it's not following
        that vision.
    </p>
    <p>
        I want to structure this into a few posts and we'll see where we end up.
    </p>
    <ol>
        <li><a href="web/technical">The technical history</a></li>
        <li><a href="web/revival">Attempts at revival</a></li>
    </ol>
</Post>
