<script lang="ts">
    type Props = {
        language?: string;
        code: string;
    };

    let { language, code }: Props = $props();
</script>

<div class="code">
    {code}
</div>

<style>
    .code {
        font-family: monospace;
        padding: 10px;
        color: hsl(0, 0%, var(--secondary-lightness));
        background-color: hsl(0, 0%, var(--primary-lightness));
        border-radius: 10px;
    }
</style>
