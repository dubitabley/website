<!--
    @component Component for a larger section that requires criticism, will be displayed differently
-->
<script lang="ts">
    import type { Snippet } from "svelte";
    import { getDraftContext } from "./draft-types";

    type Props = {
        children: Snippet;
        criticism: Snippet;
    };

    let { children, criticism }: Props = $props();

    let { enabled } = getDraftContext();
</script>

{#if enabled()}
    <div class="section-wrapper">
        <details class="section-criticism-details">
            <summary>Criticism info</summary>
            <div>
                {@render criticism()}
            </div>
        </details>
        {@render children()}
    </div>
{:else}
    {@render children()}
{/if}

<style>
    .section-wrapper {
        border-left: 2px solid hsl(10, 80%, 50%);
        padding-left: 5px;
    }

    .section-criticism-details {
        border-left: 5px solid hsl(200, 80%, 50%);
        padding: 10px;
    }
</style>
