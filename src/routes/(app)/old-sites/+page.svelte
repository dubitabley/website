<script lang="ts">
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>

<style>
    .site-panel {
        background-color: var(--background-color-2);
        display: block;
        padding: 20px;
        margin: 20px;
    }
</style>

<h1>
    Old websites
</h1>

<div>
    I love old websites so here's a collection of them.
</div>

<div class="site-panel">
    <a href="https://www.dragonflycave.com/">The Dragonfly Cave</a>
    <div>
        <p>
            Really cool pokémon themed website which features a lot of really interesting 
            things. Actively maintained and cared for to this day, updated and nicely styled.
            My favourite part of it is the articles explaining the game mechanics, especially
            <a href="https://www.dragonflycave.com/mechanics/gen-i-capturing">this page explaining the strange mechanics of capturing pokemon in generation 1.</a>
        </p>
    </div>
</div>

<div class="site-panel">
    <a href="https://victorianweb.org/">The Victorian Web</a>
    <div>
        <p>
            This website does show its age but it's an interesting look at various aspects of life in 
            Victorian times, all the way through social, political, literary, educational, scientific and
            everything else.
            There's so much to explore here, one interesting thing is <a href="https://victorianweb.org/history/pms/gladov.html">the biography 
            and other information on William Gladstone, the GOM (Grand Old Man (or God's Only Mistake)).</a>
        </p>
    </div>
</div>

<div class="site-panel">
    <a href="https://www.exclassics.com/">The Ex-Classics Site</a>
    <div>
        <p>
            I love this because of how obscure it is. It's so cool to feature texts that were classics 
            when the books we regard as classics today. The most interesting text to me is 
            <a href="https://www.exclassics.com/pamphlets/pamph003.htm">
                A fiery flying roll by Abiezer Coppe.
            </a>
            Abiezer Coppe was one of a group called the ranters which was definitely crazy but 
            no more crazy than society writ large.
        </p>
    </div>
</div>