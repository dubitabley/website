<script lang="ts">
    import type { Snippet } from "svelte";
    import { setDraftContext } from "./draft-types";

    type Props = {
        children: Snippet;
    };

    let enabled = $state(false);

    let { children }: Props = $props();

    setDraftContext({
        enabled: () => enabled,
    });
</script>

<div>
    This is a draft. Enable criticism here:
    <input type="checkbox" bind:checked={enabled} />
</div>
{@render children()}
