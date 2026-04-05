<script lang="ts">
    import { getTitleComponents } from "./title.svelte";

    let { children } = $props();

    let title = $derived.by(() => {
        let value = "dubitable";
        if (getTitleComponents().length === 0) {
            value += " - experiments";
        } else {
            value += " - " + getTitleComponents().join(" - ");
        }
        return value;
    });
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

{@render children?.()}
