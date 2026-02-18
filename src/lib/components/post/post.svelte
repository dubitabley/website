<script lang="ts">
    import type { Snippet } from "svelte";
    import {
        setFootnoteContext,
        type FootnoteContextClosure,
    } from "./footnote-types";
    import AllFootnotes from "./all-footnotes.svelte";

    type PostProps = {
        children?: Snippet;
    };

    let { children }: PostProps = $props();

    let footnoteContext: FootnoteContextClosure = [];

    setFootnoteContext(footnoteContext);
</script>

{@render children?.()}

<AllFootnotes footnotes={footnoteContext.map((x) => x())} />
