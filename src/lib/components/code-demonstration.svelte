<!--
    @component Component for demonstrating some code snippet
    Could be used for SVGs or a simple rendering engine.
 -->
<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        code: Snippet;
        output: Snippet;
    };

    let { code, output }: Props = $props();
</script>

<div class="demonstration">
    <div class="box">
        <span class="box-overlay">Code</span>
        {@render code()}
    </div>
    <div class="box">
        <span class="box-overlay">Output</span>
        <div>
            {@render output()}
        </div>
    </div>
</div>

<style>
    .demonstration {
        display: grid;
        margin: 10px;
        grid-template-columns: 1fr 1fr;
    }

    .box {
        border: 3px solid var(--primary-color);
        display: flex;
        align-items: center;
        justify-content: center;

        anchor-name: --box-anchor;
        anchor-scope: --box-anchor;
    }
    .box-overlay {
        position: absolute;
        position-anchor: --box-anchor;
        left: anchor(left, 5px);
        margin-left: 10px;
        top: anchor(top, 5px);
        margin-top: -7px;
        background: var(--background-color);
        padding: 2px;
        border: 3px solid var(--primary-color);
    }
</style>
