<!--
  @component A writing text component purely using CSS, only works for a single line
-->
<script lang="ts">
    import type { Snippet } from "svelte";

    type WritingTextProps = {
        children: Snippet;
        appear: boolean;
    };

    let { children, appear }: WritingTextProps = $props();
</script>

<div class={["appearing", appear && "appear"]}>
    {@render children()}
</div>

<style>
    .appearing {
        position: relative;
        font-size: 20px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        width: 0px;

        transition: width 6s linear;

        &:not(.appear) {
            /* don't transition when hiding */
            transition: none;
        }
    }

    .appear {
        width: 100%;
    }

    @keyframes appear-anim {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }
</style>
