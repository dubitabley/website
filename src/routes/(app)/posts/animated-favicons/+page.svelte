<script>
    import CodeSnippet from "$lib/components/post/code-snippet.svelte";
    import Footnote from "$lib/components/post/footnote.svelte";
    import Post from "$lib/components/post/post.svelte";

    import Favicon from "$lib/assets/favicon.svg";
</script>

<Post>
    <h1>Animated favicons</h1>

    <p>
        My favicon used to be animated. Well it still is but it simply doesn't
        animate anymore in Firefox, only displaying the first frame. If you
        don't know what a favicon is, it's the name for the icon next to the tab
        for the webpage. It's short for favourite icon and was originally
        created for bookmarks(favourites) to be able to quickly distinguish
        websites from a list. On mobile it should show up when scrolling through
        the tabs you have open or looking through your bookmarks. Interestingly
        it still animates for me on the bookmark toolbar, but not on the browser
        tab.
    </p>

    <figure>
        <img src={Favicon} alt="Animated text scrolling the word 'dubitable" />
        <figcaption>
            My favicon, showing the word 'dubitable' scrolling by. I know,
            immensely creative.
        </figcaption>
    </figure>

    <p>
        It's never animated on Google Chrome or Microsoft Edge. I don't have a
        way to check but it wouldn't have worked for Safari either; so no other
        browser allows animated favicons. The <a
            href="https://en.wikipedia.org/wiki/Favicon#Animated_favicons"
            >Wikipedia article</a
        >
        says that "Various browsers such as Firefox and Opera support animation of
        favicons", however the citations only apply to Firefox and I suspect this
        isn't true for Opera since there's no citation for it and the other ones for
        Opera predate 2013, which is when Opera changed from their custom browser
        engine to Chromium<Footnote
            >Chromium is the engine behind Google Chrome. Almost all browsers
            these days use Chromium under the hood for various reasons that are
            too long for this footnote. Edge originally was meant to be built
            using their own engine but they relented to just use Chromium. Now
            Opera, Brave etc. just use Chromium</Footnote
        >. So now animated favicons are fully dead in all mainstream browsers.
    </p>

    <p>
        A favicon is specified with the following HTML:
        <CodeSnippet code={`<link rel="icon" href="/favicon.png" />`} />
        Interestingly there is a reference to the icon in the HTML specification for
        the link element but most of it is left up to the user agent<Footnote
            >Specification terminology for a Web Browser, since it's the agent
            the user is using to interact with the Web and there are agents that
            aren't browsers. Can see <a
                href="https://developer.mozilla.org/en-US/docs/Glossary/User_agent"
                >the MDN Web Docs glossary</a
            > explaining what it is.</Footnote
        >. "Icons could be auditory icons, visual icons, or other kinds of
        icons." It would be cool to have an auditory favicon or even the vague
        "other kinds" but I doubt that could be done in a way that's acceptable
        to users and web developers. Most of this specification is the kind of
        spec that retroactively describes the behaviour that already existed
        rather than building a specification from scratch for a coherent,
        consistent and easy to use API so it's intentionally vague since
        different browsers already have their own behaviour in this regard. It's
        also not the kind of area that would cause developers too many
        compatibility issues.
    </p>

    <p>
        The old firefox bug on their bug tracker for disabling animated favicons
        is <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=111373"
            >this one from 2001</a
        >, staggeringly from 24 years ago. Sharp-eyed readers will notice that
        (as of 2026-04-07 at least) the bug is still open though and hasn't been
        updated in over a year. So what happened? Where did it get changed? I
        went looking through the source code of Firefox to see how and why it
        was changed. For GIFs not animating, I found
        <a href="https://phabricator.services.mozilla.com/D269948"
            >this set of code changes</a
        >
        which is linked to
        <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1586083"
            >this bug</a
        >. The gist of the change is that programs will often have multiple
        processes since it improves security using sandboxing. The program can
        give one of the children lower permissions so that even if there's a
        vulnerability in it and an attacker can run arbitrary code that code
        can't escape the process and cause a serious security flaw. The change
        here was to render the favicon image in the child process that loads it
        rather than the main browser process<Footnote
            >Note that the main process is also called <a
                href="https://firefox-source-docs.mozilla.org/dom/ipc/process_model.html#parent-process"
                >Parent process or Chrome process</a
            > which can be a little confusing.</Footnote
        >. However it simply renders the first frame which means that GIFs will
        only show that first frame now. I thought this was unintentional but
        after searching through the Firefox bug archive I found that I was not
        the first person to notice this change.
        <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=2013731"
            >This bug</a
        > was raised and the author of the change earlier commented on it that it
        was an expected change from the other bug and it was closed.
    </p>
    <p>
        My favicon was not a GIF though, it was an animated SVG using <a
            href="https://css-tricks.com/almanac/properties/a/animation/"
            >CSS animations</a
        >
        to scroll the text. What caused my one to stop animating? I tracked this one
        down to
        <a href="https://phabricator.services.mozilla.com/D273423"
            >this change</a
        >
        related to
        <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1999468"
            >this bug</a
        > which is doing a similar thing to the raster image change but for SVG images.
        Note that you can change browser.tabs.remoteSVGIconDecoding in Firefox's about:config
        to false and still see the wonder of my animated favicon. At least unless
        either that gets changed or my favicon gets changed.
    </p>
    <p>
        Some other people have noticed this change, I did find <a
            href="https://www.reddit.com/r/neocities/comments/1r6xlg3/how_do_i_get_my_favicon_to_remain_animated/"
            >this reddit thread where someone is confused why their favicon
            isn't animated/</a
        > so I'm not totally alone. It would be nice if Mozilla had mentioned somewhere
        that they were changing this feature, including on that original bug report
        from 2001 since it shows up fairly high on search. Here's a few reflections
        on this.
    </p>
    <ol>
        <li>
            I shouldn't have been using an animated favicon. I mostly did it
            because I could and I like to experiment with things on this site
            and the primary user is me. However it is a poor user experience for
            a similar reason to <a href="/posts/animated-text"
                >animated text being annoying</a
            >, except this is even more egregious since it applies anytime you
            have the tab open.
        </li>
        <li>
            You could technically still animate the favicon manually by using
            Javascript to code the image and update it. I would never do this
            because it's a waste of time and it would be fighting against the
            browser which I don't really want to do. I want to use modern and
            convenient idiomatic HTML, CSS and Javascript as and when needed.
            Some web applications do change the favicon by putting notification
            icons on the favicon when there's something for them to check. This
            isn't quite what favicons are intended for but it isn't too far
            against the grain of how they work.
        </li>
        <li>
            Google Chrome leads all browsers' development since it's the most
            used browser, and the underlying engine Chromium is even more widely
            used. This means that any features that only exist in Firefox are
            not cared about since it would only be usable for a small percentage
            of all web users. This point isn't a novel one but it's worth
            mentioning.
        </li>
        <li>
            The change to improve security is a good one overall. Browser
            security is really important since so much of our interactions
            happen over the web and it is supposed to be safe to browse
            untrusted websites. They're so important that they get a huge amount
            of effort used to break the security and because there's so many
            features on the web and the code needs to be high performant there
            are inevitably mistakes causing security issues. Image decoding is a
            significant part of this, there being many different formats and
            decoders for images and plenty of them being written in unsafe
            programming languages, so moving favicons to be decoded in a child
            process which is less privileged provides an extra layer of
            security. You can view these links to see just how many security
            vulnerabilities there are in <a
                href="https://app.opencve.io/cve/?product=chrome&vendor=google"
                >Chrome</a
            >
            and
            <a href="https://app.opencve.io/cve/?product=firefox&vendor=mozilla"
                >Firefox</a
            > that get found.
        </li>
    </ol>

    <p>
        Finally, I need a new favicon. I've never known what to use for profile
        pictures on any platform so I tend to use whatever images I think are
        cool. It would be nice if I had something consistent and interesting.
    </p>
</Post>
