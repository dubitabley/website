<script>
    import Footnote from "$lib/components/post/footnote.svelte";
    import Post from "$lib/components/post/post.svelte";
</script>

<Post>
    <hgroup>
        <h1>The Dominion of the Sword</h1>
        <h3>
            by Anonymous<Footnote
                >More like unknown than anonymous but I'm going with
                Wikisource's notation</Footnote
            >
        </h3>
    </hgroup>
    <p>
        Note that this is more of a ballad than a poem but I'm rolling with it
        anyway.
    </p>
    <p>
        I heard this from the excellent song of the same name by Martin Cathy
        which you can hear <a href="https://youtu.be/Na0SyJScrQo">here</a>. A
        fascinating thing is the original ballad was written in the 17th century
        and many of the lines in it reflect that while Martin Cathy wrote his
        version in the 1980s and used a few verses from the ballad and added
        some of his own. Even the updated song version by Martin Cathy is out of
        date in its own way, referencing South African Apartheid and the bombing
        of the Rainbow Warrior<Footnote>
            This was the bombing of a Greenpeace ship by French spies in New
            Zealand in 1985 since the ship was protesting the French nuclear
            testing in the South Pacific.
        </Footnote>
    </p>
    <p>
        An updated version of the song by the Melrose Quartet sung in 2017 has
        their own version of the lyrics which makes some updates. It makes the
        Rainbow Warrior reference into a more general point about eco warriors.
        It also adds a reference to warfare with drones and the missiles
        Hellfire<Footnote
            ><a href="https://en.wikipedia.org/wiki/AGM-114_Hellfire">
                Wikipedia link if you're curious but it's just a missile used
                for drone strikes
            </a></Footnote
        >/Trident<Footnote
            ><a href="https://en.wikipedia.org/wiki/Trident_(missile)"
                >Wikipedia link to the missile</a
            >
            but this can also refer to
            <a
                href="https://en.wikipedia.org/wiki/Trident_(UK_nuclear_programme)"
                >the nuclear programme</a
            > that the UK maintains.</Footnote
        >
    </p>
    <p>
        I'm not going to reproduce the entire ballad but I will add a few verses
        with annotations.
    </p>
    <p class="poem-section">
        Small pow’r the word has, <br />
        And can afford us, <br />
        Not half so much priviledge as <br />
        The sword does. <br />
    </p>
    <p>
        This is talking about how the law or arguments only mean so much in the
        end; that violence ultimately rules the world. On a purely aesthetic
        level it's fascinating that privilege used to be spelt that way and they
        have an apostrophe in power for the e.
    </p>
    <p class="poem-section">
        It fosters your masters, <br />
        It plaisters<Footnote
            >An obsolete version of plaster, i.e. covers up over</Footnote
        > disasters, <br />
        It makes the servants quickly greater <br />
        Than their masters.<Footnote
            >Note that this was written in the context around the English civil
            war when King Charles I was executed by his parliament so it had
            seemed that the "natural order" of the universe had been overturned.</Footnote
        > <br />
    </p>
    <p class="poem-section">
        It talks of small things, <br />
        But it sets up all things; <br />
        This masters money, though money <br />
        Masters all things. <br />
    </p>
    <p class="poem-section">
        It is not season, <br />
        To talk of reason, <br />
        Nor call it loyalty, when the sword <br />
        Will have it treason. <br />
    </p>

    <p>
        A criticism of the original ballad I have is that it seems to be
        mourning the weakening of the crown and church's power as if it is just
        that their rule is ordained by God and this is simply as true as the sun
        rising from the East. it does perhaps mirror the typical English opinion
        as after their brief flirtation with republicanism they quickly reverted
        back to a monarchy.
    </p>

    References:
    <ul>
        <li>
            <a
                href="https://mainlynorfolk.info/martin.carthy/songs/thedominionofthesword.html"
                >Mainly norfolk page on the song</a
            >
        </li>
        <li>
            <a
                href="https://en.wikisource.org/wiki/The_Cavalier_Songs_and_Ballads_of_England/The_Dominion_of_the_Sword"
            >
                Link to the Wikisource page for it
            </a>
        </li>
        <li>
            <a href="https://en.wikisource.org/wiki/Law_lies_a_Bleeding">
                Link to the Wikisource page for other versions of the same
                ballad over the years
            </a>
        </li>
    </ul>
</Post>

<style>
    .poem-section {
        border-left: 3px solid var(--primary-color-2);
        padding-left: 6px;
    }
</style>
