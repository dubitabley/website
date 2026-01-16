<script lang="ts">
    import Footnote from "$lib/components/post/footnote.svelte";
    import Post from "$lib/components/post/post.svelte";
    import DubitableHandwriting from "$lib/assets/posts/handwriting/dubitable handwriting.jpg";
</script>

<Post>
    <h2>Fonts and Handwriting</h2>
    <p>
        The other day I was walking around and saw something that was unusual.
        It was just a sign advertising some store but what stood out was how
        scuffed the sign was. It was clearly handwritten and was not very well
        made but that was what was interesting about it. So much text and media
        we see is so carefully curated; digitally crafted to appeal to people as
        best as possible but this wasn't that; just a sign by some guy rushed
        together to do the job.
    </p>
    <p>
        Of course there are a lot of benefits to having everything be digitised.
        It's quicker to type than to write, it's much easier to edit and search
        through. It's better for displaying, sharing and interacting with. In
        terms of styling there's some limited options, you can make text <span
            class="bold"
        >
            bold
        </span>, <span class="italic"> italic </span>
        <Footnote>
            Fun fact: The term italic originates from the font originally being
            from Italy.
        </Footnote>, or even combine
        <span class="bold italic">bold and italics.</span>
        You can change <span class="orange">text colour</span> or
        <span class="font-size-25">text size</span> to display fonts in many ways.
    </p>
    <p>
        Even more powerfully, you can make text <span class="text-animated"
            >animated</span
        >
        or <button class="interactive">interactive</button>. (Click the
        interactive word to see an effect). Obviously this is really powerful
        and allows for completely new ways of expressing your manner in ways
        that aren't as static as something like a sign or written text might be.
        There's a lot of interactive media that I really like and it's possible
        to do some incredible and beautiful things.
    </p>
    <p class="dubitable">
        One way to try to inject your own style is to use a specific font. I
        actually created the one used for this paragraph based off my own
        handwriting.
        <Footnote
            >I used the program <a href="https://fontforge.org/en-US/"
                >FontForge</a
            > to create this which is a pretty cool program.</Footnote
        >
        However, it's a laborious process and quite difficult to make it layout in
        a way that looks good. I did a decent amount of cleanup but even so there's
        a few things that don't look quite right. It's extra work if you want bold
        or italic versions of the font (I didn't bother). This is awesome but there's
        a tell-tale sign of its inauthenticity when you look at two copies of the
        same letter they're obviously the same: it doesn't have the natural variability
        of handwriting that can make it more real and expressive.
    </p>
    <img
        class="handwriting-image"
        src={DubitableHandwriting}
        alt="Handwritten text saying the following: There is something quite pleasing about the tactile nature of pen on paper and about having more control over the text. I can switch up the way I write as well, for example: This sentence was written slower for more legibility. I think my handwriting has lost something since I do it so infrequently these day. People's handwriting says quite a lot about them, for example I think mine is optimised for being quick to write and read. I remember as a child I used to write k like (cursive k) but I thought it looked weird so made a conscious decision to rework it. My concern is with all communication over digital text is that we lose this stylistic nature of handwriting. Also with websites that restrict user expression or hide it behind a paywall we lose that creativity in other ways."
    />
</Post>

<style>
    @font-face {
        font-family: "dubitable";
        size-adjust: 150%;
        src: url("$lib/assets/fonts/dubitable.woff2") format("woff2");
    }

    .dubitable {
        font-family: dubitable;
    }

    .orange {
        color: orange;
    }

    .font-size-25 {
        font-size: 25px;
    }

    .bold {
        font-weight: bold;
    }

    .italic {
        font-style: italic;
    }

    .text-animated {
        animation: shake 1s ease-in-out 0s infinite both alternate;
        display: inline-block;
    }

    .handwriting-image {
        width: 100%;
    }

    @keyframes shake {
        from {
            transform: skew(-10deg);
        }
        to {
            transform: skew(10deg);
        }
    }

    .interactive {
        all: unset;
        transition: all 0.5s ease-in-out;

        &:active {
            color: seagreen;
            font-size: 30px;
            font-weight: bold;
        }
    }
</style>
