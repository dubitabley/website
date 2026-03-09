<script lang="ts">
    import type { Snippet } from "svelte";

    type TooltipProps = {
        children: Snippet;
    };

    let { children }: TooltipProps = $props();
</script>

<svg>
    <g>
        <path></path>
        <circle> </circle>
    </g>
</svg>
