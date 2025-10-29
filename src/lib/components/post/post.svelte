<script lang="ts">
    import type { Snippet } from "svelte";
    import { setFootnoteContext } from "./footnote-types";
    import AllFootnotes from "./all-footnotes.svelte";

    type PostProps = {
        children?: Snippet;
    };

    let { children } = $props();

    let footnoteContext: Snippet[] = [];

    setFootnoteContext(footnoteContext);
</script>

{@render children?.()}

<AllFootnotes footnotes={footnoteContext} />
