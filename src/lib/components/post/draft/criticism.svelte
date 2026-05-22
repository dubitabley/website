<script module>
    export const CriticismType = {
        Info: 0,
        Bad: 1,
    };
    type CriticismType = (typeof CriticismType)[keyof typeof CriticismType];
</script>

<script lang="ts">
    import Popover from "$lib/components/misc/popover.svelte";
    import type { Snippet } from "svelte";
    import { getDraftContext } from "./draft-types";

    type Props = {
        children: Snippet;
        criticism?: Snippet;
        type?: CriticismType;
    };

    let { children, criticism, type = CriticismType.Info }: Props = $props();

    let { enabled } = getDraftContext();
</script>

{#if enabled()}
    <Popover>
        {#snippet popover()}
            {@render criticism?.()}
        {/snippet}
        <span class={[type === CriticismType.Info ? "info-text" : "bad-text"]}>
            {@render children()}
        </span>
    </Popover>
{:else}
    {@render children()}
{/if}

<style>
    .info-text {
        text-decoration: hsl(200, 100%, var(--secondary-lightness)) wavy
            underline;
    }
    .bad-text {
        text-decoration: hsl(0, 80%, var(--secondary-lightness)) wavy underline;
    }
</style>
