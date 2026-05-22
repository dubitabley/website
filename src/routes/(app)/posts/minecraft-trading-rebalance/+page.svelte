<script lang="ts">
    import ButtonSet, {
        type ButtonValue,
    } from "$lib/components/misc/button-set.svelte";
    import { fly } from "svelte/transition";
    import Draft1 from "./draft-1.svelte";
    import Final from "./final.svelte";

    const CurrentPage = {
        Final: 0,
        Draft1: 1,
    } as const;
    type CurrentPage = (typeof CurrentPage)[keyof typeof CurrentPage];

    function pageLabel(page: CurrentPage): string {
        switch (page) {
            case CurrentPage.Final:
                return "Final";
            case CurrentPage.Draft1:
                return "Draft 1";
            default:
                throw new Error(`Invalid page`);
        }
    }

    function buttonLabel(page: CurrentPage): ButtonValue {
        return { value: page, label: pageLabel(page) };
    }

    let currentPage: CurrentPage = $state(CurrentPage.Final);
</script>

{#if currentPage === CurrentPage.Final}
    <div
        in:fly={{ x: -200, duration: 300 }}
        out:fly={{ x: 200, duration: 300 }}
    >
        <Final />
    </div>
{:else if currentPage === CurrentPage.Draft1}
    <div
        in:fly={{ x: -200, duration: 300 }}
        out:fly={{ x: 200, duration: 300 }}
    >
        <Draft1 />
    </div>
{/if}

<div class="final-section">
    <div>
        I've been reading "On Writing Well" by William Zinsser and thinking more
        about rewriting and editing my works so decided to try that here. I also
        wanted to do it in a structured way and keep the evidence of both the
        drafts and my criticisms of them so here's the options to see that.
    </div>

    <ButtonSet
        values={[
            buttonLabel(CurrentPage.Final),
            buttonLabel(CurrentPage.Draft1),
        ]}
        bind:value={currentPage}
    />
</div>

<style>
    .final-section {
        border: 4px double var(--primary-color-2);
        padding: 10px;
    }
</style>
