<script lang="ts">
    import Footnote from "$lib/components/post/footnote.svelte";
    import Post from "$lib/components/post/post.svelte";
    import NeonText from "$lib/components/post/text/neon-text.svelte";
    import ScrollingText from "$lib/components/post/text/scrolling-text.svelte";
    import { EffectType } from "$lib/components/post/text/text-effect-types";
    import TextEffectWrapper from "$lib/components/post/text/text-effect-wrapper.svelte";
    import TextEffect from "$lib/components/post/text/text-effect.svelte";

    import NetscapeBadge from "./netscape-badge.jpg";

    let effectType: EffectType = $state(EffectType.None);
    let enabledScrolling = $state(false);
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
                that can be used to support users who don't want to see motion
                on websites called <a
                    href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion"
                    >@prefers-reduced-motion</a
                > that can be used to indicate to sites that they don't want animation
                but I'm not currently using this; however it's a potentially useful
                option.
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
                Of course people have their own special effects that they might
                use for important pages where they're trying to impress people
                with dramatics. It does catch your attention and draw attention
                to it but tends to be a little awkward to read and is
                overbearing in my opinion.
            </p>
            <label>
                Enable scrolling effect
                <input type="checkbox" bind:checked={enabledScrolling} />
            </label>
        </TextEffect>

        <TextEffect>
            <ScrollingText enabled={enabledScrolling}>
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
</style>
