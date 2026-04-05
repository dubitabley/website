<script lang="ts">
    import { onDestroy, type Snippet } from "svelte";
    import { deleteTitleLevel, setTitleLevel } from "../title.svelte";

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();

    setTitleLevel(0, "svg");

    onDestroy(() => {
        deleteTitleLevel(0);
    });
</script>

{@render children()}
