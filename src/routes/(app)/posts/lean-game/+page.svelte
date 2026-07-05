<script>
    import SimpleMaths from "$lib/components/maths/equation/simple-maths.svelte";
    import Footnote from "$lib/components/post/footnote.svelte";
    import Post from "$lib/components/post/post.svelte";
</script>

<Post>
    <h1>Thoughts on the Natural Number Game as a Video Game</h1>

    <p>
        I've been playing the Natural Number Game recently and completed all the
        levels there are<Footnote
            >Barring one, which I'll mention later</Footnote
        >
        and thought it was fun as a video game in its own right, not just as a learning
        tool so wanted to discuss it in that context.
    </p>

    <h3>What is the Natural Number Game?</h3>
    <p>
        The Natural Number Game or NNG as I'll call it for brevity is a game for
        learning how Lean works. Lean is a proof assistant for Mathematics where
        you can enter your axioms/definitions of values and operations and from
        them derive facts about those values. As the name of the game implies,
        we focus on the Natural Numbers, <strong>N</strong><Footnote
            >Normally you denote the Natural Numbers with a <a
                href="https://en.wikipedia.org/wiki/Blackboard_bold"
                >Blackboard bold</a
            > N but there's no easy way to typeset that so I'll just use a bold N</Footnote
        >. These are called that since they're just the counting numbers, i.e.
        numbers that you can get from counting. So 0,1,2,3,etc. We define
        addition, multiplication and powers on these numbers and prove important
        rules about those operations that we take for granted in everyday use.
    </p>
    <h3>How does it function as a video game?</h3>
    <p>
        The NNG shares many features in common with typical video games. It
        obviously seems to be a kind of puzzle game in that you have to use the
        tools you have available to complete the levels in creative and
        inventive ways. As the game goes on you get more powerful tools which
        allow you to prove some complex things. Early on in the addition world
        you have to prove <SimpleMaths equation="2+2=4" /> which sounds trivial but
        since you can't assume many basic things about addition you have to do it
        in a particular non-obvious way. Similar to a puzzle game like Portal where
        you start off with just one colour portal but unlock the second one to solve
        more complex levels, in NNG you unlock induction which is a very powerful
        mathematical tool for proving propositions which functions by splitting it
        into two cases; one is a base case so for the natural numbers this will be
        when the value is 0; the other case is the inductive step where we can assume
        it's true for n-1 and we have to prove that that implies it's true for n as
        well.
    </p>
    <p>
        One aspect that's especially pleasing about the NNG is that many of the
        lemmas/theorems that you prove are then used later on so it's as if
        you're building your own foundations up as you go along. This would be
        cool to incorporate into more puzzle games to give context to the
        puzzles. It would mean the intermediate puzzles can serve purposes of
        both learning the mechanics and building towards the final objective.
    </p>
    <h3>The impossible level</h3>
    <p>
        The final level in the Power World is actually essentially impossible
        since it asks you to prove Fermat's Last Theorem which was famously one
        of the great unsolved problems in Mathematics for centuries before
        finally being proven by Andrew Wiles in 1995. Solving it would require
        millions of lines of Lean code and would be fiendishly difficult to do
        since it uses many advanced techniques. This is kinda cool to do
        although it does spoil my finished game a bit since there's a
        level/world that's unbeaten. Still it demonstrates the horizon so we can
        grasp the power of Lean as a proof assistant for proper mathematics.
    </p>
    <h3>The Mechanics</h3>
    <p>
        Some of the mechanics of the game took a while to get used to;
        especially for the tactics that had many purposes such as <code
            >cases</code
        >
        which could be used in <i>four</i> different contexts for different
        purposes which made it very flexible but also hard to keep track of. The
        syntax was also a bit awkward to get used to at first, with
        <code>rw</code> being the only tactic to require square brackets. After some
        usage I could get used to it but it added a little confusion early on. There
        are hints for the difficult levels which are very useful and it makes it more
        of a challenge to complete the levels without those hints. The main criticisms
        of the game are around it being slow to load and a bit buggy which was quite
        painful at times.
    </p>
    <h3>Difficulty</h3>
    <p>
        I took Mathematics at University where I studied logic and learned
        induction and even then I found the game quite tricky, perhaps a
        precocious child could pick things up but it would require quite a lot
        of concentration and outside research to get those ideas along with
        learning the syntax and mechanics of the game. It's definitely more
        difficult for the average person than would be ideal for a video game
        but that's okay since it's aimed at mathematicians. I'm not sure what an
        easy mode of the game would look like; perhaps it would have to have a
        lot more levels that go through concepts even more slowly but at some
        point you are teaching some fairly advanced mathematics which is never
        going to be trivial. I do think it could be an effective teaching tool
        for those concepts though, perhaps as a supplementary tool to regular
        lessons since people learn by doing rather than by reading or listening.
        Thus by applying the techniques in this game I could imagine getting a
        grasp on how they work.
    </p>

    <h3>Conclusion</h3>
    <p>
        If you're mathematically inclined I encourage you to give it a go and
        enjoy it. This is the link: <a
            href="https://adam.math.hhu.de/#/g/leanprover-community/nng4"
            >https://adam.math.hhu.de/#/g/leanprover-community/nng4</a
        > I really encourage you to read the helper texts and not to rush in since
        the text gives really important information.
    </p>
</Post>
