<script lang="ts">
    import Footnote from "$lib/components/post/footnote.svelte";
    import Post from "$lib/components/post/post.svelte";
    import NeonText from "$lib/components/post/text/neon-text.svelte";
    import ScrollingText from "$lib/components/post/text/scrolling-text.svelte";
    import { EffectType } from "$lib/components/post/text/text-effect-types";
    import TextEffectWrapper from "$lib/components/post/text/text-effect-wrapper.svelte";
    import TextEffect from "$lib/components/post/text/text-effect.svelte";
    import WritingText1 from "$lib/components/post/text/writing-text-1.svelte";
    import WritingText2 from "$lib/components/post/text/writing-text-2.svelte";
    import WritingText3 from "$lib/components/post/text/writing-text-3.svelte";

    import NetscapeBadge from "./netscape-badge.jpg";

    let effectType: EffectType = $state(EffectType.None);
    let sideScrollingEnabled = $state(false);

    let appearText1 = $state(false);
    let appearText2 = $state(false);
    let appearText3 = $state(false);
    let appearText3Speed = $state(10);
</script>

<TextEffectWrapper {effectType}>
    <Post>
        <TextEffect>
            <h2>
                Animated Text <span class="small-header"
                    >(is probably wrong)</span
                >
            </h2>
        </TextEffect>

        <TextEffect>
            <p>
                This is a short<Footnote>Well, we'll see</Footnote>
                post about how text should animate and how most of the time it shouldn't.
            </p>
        </TextEffect>

        <TextEffect>
            <p>
                Back in ye olde days of the internet, during the First Browser
                Wars the browsers were 'innovating' by way of creating new
                features for budding web developers to use on their websites and
                thus those sites would only function correctly on those
                browsers. Then developers might put badges on their sites such
                as the following to recommend the browser that their site
                displayed on correctly:
            </p>
        </TextEffect>
        <TextEffect>
            <img
                src={NetscapeBadge}
                alt="Small badge saying Netscape Now!"
                width="88px"
                height="31px"
            />
        </TextEffect>
        <TextEffect>
            <p>
                One infamous such web feature was the &lt;blink&gt; tag which
                displays text that blinks in and out so you would do something
                like &lt;blink&gt;blinking text&lt;/blink&gt; and it would look
                like <span class="blink-css">blinking text</span>.<Footnote
                    >This doesn't work in modern browsers so it's simulated by
                    using CSS copied from the <a
                        href="https://en.wikipedia.org/wiki/Blink_element"
                        >Wikipedia page</a
                    ></Footnote
                > However this was never implemented in any browser other than Netscape
                and thus fell out of favour. The reason for it being neglected is
                that it's annoying to read text when there's flickering in and out
                on the page, it attracts the eye which demonstrates one of the major
                pitfalls of animated text.
            </p>
        </TextEffect>
        <TextEffect>
            <p>
                Obviously you can do more fancy things with animated text such
                as modifying the size or colours of text like I do in the header
                of this site. I justify this since the header isn't visible if
                you scroll down sufficiently and it should be separated from the
                rest of the page enough to be readable. There is a rule in CSS
                that can be used to support users who don't want to see
                excessive motion on websites. It's the rule <a
                    href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion"
                    >@prefers-reduced-motion</a
                >
                and in CSS you could disable/diminish animations but I am not currently
                using this and I suspect it's not widely used;
                <Footnote>
                    I did think this but Chrome shows stats on usages of various
                    web platform features so I decided to look it up. According
                    to that on the page <a
                        href="https://chromestatus.com/metrics/feature/timeline/popularity/4961"
                        >Chrome status page for the feature</a
                    > it does feature on over 50% of page loads. Note that this doesn't
                    mean over 50% of websites; if more popular websites use it then
                    that skews the stats immensely. I'm not totally sure on the best
                    way to interpret this data and it might be more useful to break
                    it down into the number of websites and amount it's used but I
                    am willing to revoke my suspicion.
                </Footnote> however it's a potentially useful option.
            </p>
        </TextEffect>
        <TextEffect>
            <p>
                Another common thing people do with animated text especially on
                modern websites is to fade in and out text as you scroll. Try
                checking the checkbox then scrolling up and down the page to see
                a crude example of this effect.
            </p>
            <label>
                <span>Enable fade-in effect</span>
                <input
                    type="checkbox"
                    bind:checked={
                        () => effectType == EffectType.FadeIn,
                        (v) =>
                            (effectType = v
                                ? EffectType.FadeIn
                                : EffectType.None)
                    }
                />
            </label>
        </TextEffect>

        <TextEffect>
            <p>
                The main inspiration for this post but one that I somehow forgot
                to include originally is about text that appears as if it was
                being written. This is very common in text heavy video games
                since it assists reading in some ways since you can follow the
                text as it's drawn. However there are a number of drawbacks.
            </p>
            <ul>
                <li>
                    If the scrolling is too slow it can be boring to wait for it
                    to load in
                </li>
                <li>
                    If the scrolling is too fast it becomes moot and just a
                    distraction
                </li>
                <li>
                    It's easy to do in a way that's annoying; especially if the
                    text needs to wrap onto multiple lines
                </li>
            </ul>
        </TextEffect>

        <TextEffect>
            <label>
                <span>Show text being written - 1</span>
                <input type="checkbox" bind:checked={appearText1} />
            </label>
            <div class="outline">
                <WritingText1 appear={appearText1}>
                    <span>
                        Text that gets written using a simple CSS transition.
                        This has a number of issues though.
                    </span>
                </WritingText1>
                <p class={[!appearText1 && "hide"]}>
                    The issue with this is that it only works for a single line
                    and the timing is per the whole thing rather than per
                    letter.
                </p>
            </div>
        </TextEffect>

        <TextEffect>
            <label>
                <span>Show text being written - 2</span>
                <input type="checkbox" bind:checked={appearText2} />
            </label>
            <div class="outline">
                <WritingText2
                    text={`Text that gets written using a javascript timer per character. ` +
                        `This is very scuffed in that it allocates space as it gets drawn. ` +
                        `Notably this results in the problem that surrounding elements have to move around. ` +
                        `There's also a really annoying problem in that a word will wrap to the next line halfway` +
                        `through being drawn which I really hate.`}
                    appear={appearText2}
                />
            </div>
        </TextEffect>

        <TextEffect>
            <div>
                <label>
                    <span>Show text being written - 3</span>
                    <input type="checkbox" bind:checked={appearText3} />
                </label>
                <label>
                    <span>Speed:</span>
                    <input
                        type="range"
                        min="5"
                        max="100"
                        bind:value={appearText3Speed}
                    />
                </label>
            </div>
            <div class="outline">
                <WritingText3
                    text={`This is similar to the one above but it allocates the space up front ` +
                        `and just hides the text that isn't being displayed which is closer to ` +
                        `what I think is the ideal for this type of effect. ` +
                        `I've added a slider to adjust the speed of the text but you could add extra effects ` +
                        `or make it more configurable and effective. ` +
                        `Some random ideas are to add a blinking cursor to simulate ` +
                        `a writing effect or to make the letters animate slightly when they appear.`}
                    appear={appearText3}
                    speed={appearText3Speed}
                />
            </div>
        </TextEffect>

        <TextEffect>
            <p>
                Of course people have their own special effects that they might
                use for important pages where they're trying to impress people
                with dramatics. It does catch your attention and draw attention
                to it but tends to be a little awkward to read and is
                overbearing in my opinion such as the following.<Footnote>
                    I used checkboxes for these so you can disable them to avoid
                    the issues as outlined elsewhere.
                </Footnote>
            </p>
            <label>
                Enable scrolling effect
                <input type="checkbox" bind:checked={sideScrollingEnabled} />
            </label>
        </TextEffect>

        <TextEffect>
            <ScrollingText enabled={sideScrollingEnabled}>
                <span>Epic scrolling text!</span>
            </ScrollingText>
        </TextEffect>

        <TextEffect>
            <p>
                Of course there are infinitely many things you can do with text
                to make it more interesting. I am not against creativity and
                making things more dynamic and engaging. Heaven knows there's
                too much text written in a bland and uninteresting style that
                only appears to exist for the sake of it. However when the style
                distracts from the substance it tends to detract from the value
                of the web as a medium. The power of the web means you can do
                things which aren't advisable. Animated text is almost always
                trickier to read and distracting.
            </p>
        </TextEffect>

        <TextEffect>
            <p>That being said, if you did want to... <br /></p>
            <p>
                You can do some interesting things with animated text and it
                depends on the context. For example text sliding in as part of a
                powerpoint can be cool even if it is quite generic because of it
                being a built-in transition in most slideshow programs. The key
                to this being valuable and not a hindrance is that it's
                triggered by user input and not just aas a result of regular
                usage where it detracts from being able to read the text
                clearly.
            </p>
        </TextEffect>
        <TextEffect>
            <p>
                If I come up with other cool effects I will try to add them here
                but some examples could be some animated text to simulate neon
                text for a header such as the following:
            </p>
            <NeonText>Example</NeonText>
        </TextEffect>
    </Post>
</TextEffectWrapper>

<style>
    .small-header {
        font-size: 15px;
    }

    /* yoinked from https://en.wikipedia.org/wiki/Blink_element */
    @keyframes blink {
        0% {
            opacity: 1;
        }
        75% {
            opacity: 1;
        }
        76% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

    .blink-css {
        animation: blink 0.75s ease-in infinite alternate;
    }

    label {
        font-size: 20px;
        input[type="checkbox"] {
            width: 20px;
            height: 20px;
        }
    }

    .hide {
        visibility: hidden;
    }

    .outline {
        border: 2px solid var(--primary-color);
        padding: 10px;
    }
</style>
