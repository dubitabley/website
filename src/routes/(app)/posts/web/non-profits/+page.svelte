<script>
    import Footnote from "$lib/components/post/footnote.svelte";
    import Post from "$lib/components/post/post.svelte";
</script>

<Post>
    <summary>
        Some non-profits are focused on software or the web and have their own
        methods of improving the experience for people, so here we'll have a
        look at a few of them and see what their goals are and how they're
        doing.
    </summary>

    <p>
        As an example of the principles of what the web should be, Mozilla's
        manifesto is an interesting one, Mozilla being a non-profit that is
        supposed to be helping to build a greater internet for all. Obviously
        its flagship "product" is the Firefox web browser which is built with
        the Gecko engine, one of the three main browser engines.
        <Footnote>
            The other two are Blink, used for Chrome, Edge and some others and
            Webkit, used for Safari.
        </Footnote>
        Their manifesto
        <a href="https://www.mozilla.org/en-US/about/manifesto/details/">
            is described here.
        </a>
    </p>
    The principles are as follows:
    <ol>
        <li>
            The internet is an integral part of modern life—a key component in
            education, communication, collaboration, business, entertainment and
            society as a whole.
        </li>
        <li>
            The internet is a global public resource that must remain open and
            accessible.
        </li>
        <li>The internet must enrich the lives of individual human beings.</li>
        <li>
            Individuals' security and privacy on the internet are fundamental
            and must not be treated as optional.
        </li>
        <li>
            Individuals must have the ability to shape the internet and their
            own experiences on the internet.
        </li>
        <li>
            The effectiveness of the internet as a public resource depends upon
            interoperability (protocols, data formats, content), innovation and
            decentralized participation worldwide.
        </li>
        <li>
            Free and open source software promotes the development of the
            internet as a public resource.
        </li>
        <li>
            Transparent community-based processes promote participation,
            accountability and trust.
        </li>
        <li>
            Commercial involvement in the development of the internet brings
            many benefits; a balance between commercial profit and public
            benefit is critical.
        </li>
        <li>
            Magnifying the public benefit aspects of the internet is an
            important goal, worthy of time, attention and commitment.
        </li>
    </ol>

    <p>
        The first one is indisputably true and why this all matters. It's
        actually quite a concern how reliant we all are on systems that aren't
        necessarily that resilient. The rest are primarily about how the
        internet should be. I think 6 is interesting because interoperability
        and innovation are often in conflict in that innovation requires trying
        things and going fast which means making mistakes while interoperability
        requires agreement and specifications. This would be quite relevant to
        Mozilla since they develop one of the most popular web browsers and thus
        have a role in shaping those technologies and their usage; they have a
        significant role in defining the specifications for technology but it's
        difficult to see them being on the forefront of those technologies. They
        do act as a useful handbrake in some cases for protecting security and
        privacy on the web since they're not beholden to advertising like Google
        is. Mozilla does have <a href="https://wiki.mozilla.org/Origin_Trials">
            origin trials
        </a>
        but it pales in comparison to
        <a href="https://developer.chrome.com/origintrials/#/trials/active">
            Google's one
        </a>
    </p>
    <p>
        In terms of breakthrough technologies, Mozilla has Firefox which it was
        created for. It also initiated the <a
            href="https://developer.mozilla.org/en-US/"
        >
            MDN Web Docs
        </a>
        which are exceptionally useful documentation for developing with web technologies.
        There's also the
        <a href="https://rust-lang.org/">Rust programming language</a> which is a
        fantastic language but isn't really related to Mozilla these days even though
        it was incubated there.
    </p>
    <p>
        Another Mozilla document of interest is their <a
            href="https://www.mozilla.org/en-US/about/webvision/full/"
        >
            vision one found here
        </a>
        which is about their vision for how the internet should change to be better
        for all who use it. Most interesting about this one is that at the end there
        are two points where the internet has issues where they don't have a method
        of remediation. All the previous technical points they at least have a plan
        or roadmap towards a brighter future but with these last two which aren't
        technical they can only identify the issue but don't have a way to resolve
        it. The two points are to do with centralization and monetization. These ones
        in my view can't be fixed by themselves without fixing broader issues in society
        where the same problems occur outside of the internet.
    </p>
    <p>
        The next non-profit we'll look at is the W3C which was founded in 1994
        by Tim Berners-Lee to facilitate the healthy development of the World
        Wide Web. The W3C is the World Wide Web Consortium that develops the
        standards that shape the technical aspects of how the web operates.
    </p>
    <p>
        The W3C vision document which can <a
            href="https://www.w3.org/TR/w3c-vision/"
        >
            be found here
        </a> is their document to do with what their principles are as custodians
        of the specifications of the Web. However reading through the principles they
        seem to be totally contradicted by the reality of the situation where they
        can write whatever they want in their specification but ultimately what the
        browsers do rules. These seem more aspirational than anything else. Diversity
        is a great goal but unfortunately it's always going to be dominated by American
        voices with perhaps a few from Europe. Conversations and specifications naturally
        take place in English since that's the lingua franca of those countries.
    </p>
    <p>
        I guess the W3C is not really an independent organisation but a
        consortium that exists to organise various companies and allow them to
        manage the web standards together so it can't really go beyond them and
        work in ways that aren't convenient for them.
    </p>
</Post>
