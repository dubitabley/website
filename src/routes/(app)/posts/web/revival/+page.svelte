<script>
    import Footnote from "$lib/components/post/footnote.svelte";
    import Post from "$lib/components/post/post.svelte";

    import WebBadges from "./web-badges.png";
</script>

<Post>
    <h1>Reviving the Web</h1>
    <p>
        People have noticed that the web hasn't been great for a lot of reasons
        and have tried various projects to try to "fix" the internet; mostly by
        trying to revive the old customs and ways of the web closer to its
        inception. <a
            href="https://thoughts.melonking.net/guides/introduction-to-the-web-revival-1-what-is-the-web-revival"
        >
            This page by Melon
        </a> is probably the most comprehensive guide and round-up of what it is that
        I'm aware of so you may want to check that out if you're interested. In this
        post I want to look at a few attempts at trying something different and where
        they succeeded and didn't.
    </p>
    <hgroup>
        <h3>The Indie Web</h3>
        <h5><a href="https://indieweb.org/">https://indieweb.org/</a></h5>
    </hgroup>
    <p>
        The indie web is more of a concept than a project; a loose collection of
        decentralised projects with some common principles. The gist is that
        it's based around a community of people building their own independent,
        personal websites. You can read them on the link above which has pretty
        good info on what it is and why they think it's beneficial.
    </p>
    <p>
        All of the following movements can be seen as a subset of the general
        ideas set out by the indie web
    </p>
    <hgroup>
        <h3>Yesterweb</h3>
        <h5><a href="https://yesterweb.org/">https://yesterweb.org/</a></h5>
    </hgroup>
    <p>
        The yesterweb was a discord server that as best as I can tell revolves
        around writing an extraordinary number of words, at least judging from
        the home page of the yesterweb. The gist is that they grew too large and
        internal drama caused them to feel that the best move was just to shut
        down and move on.
    </p>
    <hgroup>
        <h3>Cohost</h3>
        <h5>
            <a
                href="https://web.archive.org/web/20241001020435/https://cohost.org/staff/post/7611443-cohost-to-shut-down"
                >https://cohost.org</a
            >
        </h5>
    </hgroup>
    <p>
        cohost was a social media website that tried to rebuke the monotonous
        nature of other social media and facilitate creativity. You could use
        markdown or edit HTML/CSS in posts, allowing you to format or style
        content in a more interesting way than other social media.
        <Footnote>i.e. do CSS crimes</Footnote>
        Ultimately the issue was just funding and it being draining on the developers
        to maintain the site so they ended up moving it to redirect to archive.org
        instead which is of course a lot better than selling user data or selling
        the site to greedy vultures intent on scavenging the corpse of the site for
        scraps.
    </p>
    <p>
        The site was created by a small group called the anti software software
        club and their manifesto is kinda interesting. You can read it here(the
        link is an archive one because the site seems to be dead now :( ) <a
            href="https://web.archive.org/web/20250102172920/https://antisoftware.club/manifesto/2020/03/16/part-1.html"
        >
            https://antisoftware.club/manifesto/2020/03/16/part-1.html
        </a>
        However their funding method was essentially getting money from a friend who
        wanted them to build something cool. The reason why funding is important is
        that it feels like sites like this only have two paths: 1. Take over the world
        or 2. Die. And to achieve 1. they need as much money as possible which leads
        them to venture capital. Cohost didn't go this route so they ultimately ended
        up on path 2 but maybe it doesn't have to be that way. One legacy of the site
        is eggbug as a meme; I wasn't around for that but there is something extremely
        melancholic about
        <a href="https://bsky.app/profile/adelair.cool/post/3m3ikbrqmpk25">
            graffiti like this.
        </a>
    </p>
    <hgroup>
        <h3>Neocities</h3>
        <h5><a href="https://neocities.org/">https://neocities.org/</a></h5>
    </hgroup>
    <p>
        Geocities was an early service from 1994 that allowed people to publish
        websites themselves. It was acquired by Yahoo in 1999 and ultimately
        killed off in 2009. There was a slightly interesting twist where it was
        kind of a virtual city with websites located under various
        neighbourhoods.
        <Footnote>Metaverse? No, not really.</Footnote>
        Neocities is a modern re-imagining of the same concept, where you can have
        your own website hosted on neocities and create your own site that is as customisable
        as you want it to be. It makes it cheap and relatively easy to do, you can
        get going by just writing HTML and change it as you want.
    </p>
    <p>
        One of the primary "languages" of these websites is a callback to
        websites of old: the web badge. They will often have something like
        this:
    </p>
    <img
        src={WebBadges}
        alt="Some web badges showing things such as preferred browser, OS, W3C compliance"
    />
    <p>
        They can be used for various things, such as demonstrating allegiance to
        a particular technology, philosophy, software, hardware or even link to
        your friend's websites. These are pretty fun; they fit the aesthetic of
        old websites which a lot try to adher to, recalling nostalgia for how
        the internet used to look: very custom and human instead of corporate
        and managed.
    </p>
    <hgroup>
        <h3>Federated Services</h3>
        <h5>
            <a href="https://bsky.app/"> Bluesky </a> |
            <a href="https://mastodon.social/"> Mastodon </a> |
            <a href="https://lemmy.world/"> Lemmy </a>
        </h5>
    </hgroup>
    <p>
        These are services based around the idea of federation, meaning that
        there are multiple server instances and they can communicate with each
        other and no one can controll all of them. If you disagree with
        moderation decisions or aesthetics or even vibes, then you can find
        another instance to occupy or even run your own instance. Bluesky and
        Mastodon are based off of Twitter
        <Footnote>
            I would say RIP but I was never that much of a fan before it got
            worse to be honest.
        </Footnote>
        while Lemmy is based off of Reddit. Additionally Bluesky is less federated
        as there's one main instance that almost everyone uses.
    </p>
    <p>
        Federation comes with various technical limitations and issues that make
        it tricky to do certain things. All the instances can't afford to have
        all the data from every other instances so notifications and
        interactions between instances become tricky to manage. However, despite
        that they're fully usable if that's what you're looking for. Personally,
        I've never been a Poster™ so I don't really use these much but you may
        find them interesting.
    </p>
    <h2>My thoughts</h2>
    <div>
        Having seen all of this, here are some thoughts of my own.
        <p>
            I disagree with framing this movement as "returning" or the modern
            web sucking. The old web had issues in that it was uninteresting or
            not fulfilling; this idea that we can return to some golden era that
            never was is fantastical I believe. Instead we should plan ahead,
            lay out a set of goals or principles that will hold us instead for
            how we want to shape the internet. Many of the principles as in the
            indie web project are appropriate and if we hold to some of those we
            can take what's good about the modern web and combine it with new
            ideas and beliefs to shape a web that works for everyone.
            <Footnote>
                That sounds so cliche but I don't want to rewrite it.
            </Footnote>
        </p>
        <p>
            Scaling is hard. Any centralised project will probably fail under
            its own weight since there will be issues with moderation, server
            costs and other expenses on time and money that gets excessive -
            leading people to seek monetisation which inevitably comes with its
            own set of issues. Perhaps there is a way to manage it that's
            healthy but that remains for people with more vision than me.
        </p>
        <p>
            Another risk is the trap of having everything in these spaces be
            self-referential. This comes up often, such as with the Gemini
            protocol the most common discussion/info on there is just about the
            Gemini protocol itself. It's fine to have those kinds of things but
            to grow beyond you need something that makes new people want to join
            in for some reason outside of the thing itself. In programming/tech
            this might be a "killer feature/application" that people want to use
            because it's really helpful/powerful in some way but that they have
            to use your language/platform to get started.
        </p>
        <p>
            The basics have to be simple. Most people aren't HTML/CSS experts.
            They don't want to learn how flexboxes work, or make their CSS grid
            look good on all sized devices. This one might be quite tricky to
            solve. One thing I was thinking is there could be a simpler layout
            engine that integrates well with HTML and compiles down to CSS or a
            visual tool that supports making good layouts easy to create. This
            is really difficult though and there may not be a good solution;
            perhaps just giving people a nice template to achieve what they want
            is best.
        </p>
        <p>
            "Talk is cheap. Show me the code" - Linus Torvalds. Unfortunately
            there probably is too much talking, discussion etc. When you see
            this <a href="https://wiki.melonland.net/manifestos">
                list of manifestos
            </a>
            (and there are many more not on that list)
            <Footnote>
                Obviously I am deeply hypocritical since this very post is an
                instance of a similar thing.
            </Footnote>
            , it feels like it's just a neverending amount of text complaining about
            the same things. The quote by Linus to begin this paragraph indicates
            that change has to begin with practical changes and solutions that are
            visible. The decentralised nature of things should mean that changes are
            possible in some corner and if they're successful then they can grow out
            and expand until they either collapse under their own weight (most likely)
            or take a life of their own.
        </p>
        <p>
            Sometimes it's easy to think the best solution is just to log off
            and go outside.
            <Footnote>"Touch grass"</Footnote>
            To turn off the phone, read a book, go for a walk. This can be beneficial
            to some degree but the world is ruled by the internet now. I think we
            have to contend with this reality; in some sense I think we're trying
            to shape mainstream opinion which can be done but only to some extent
            and only so far as it doesn't contradict things they already believe.
            To that end we want to set out a positive vision of the world as it could
            be and proselytise that vision rather than focus too much on the negatives.
        </p>
        <figure>
            <blockquote
                cite="https://en.wikiquote.org/wiki/Robert_F._Kennedy#Misattributed"
            >
                "Some men see things as they are and say why, I dream things
                that never were and say why not."
            </blockquote>
            <figcaption>
                Heavily paraphrased from George Bernard Shaw's <i>
                    Back To Methuselah
                </i>. See
                <a
                    href="https://en.wikiquote.org/wiki/Robert_F._Kennedy#Misattributed"
                >
                    Wikiquote for info
                </a>
            </figcaption>
        </figure>
    </div>
</Post>
