<script lang="ts">
    type KeyProps = {
        key: string,
    }

    let {
        key
    }: KeyProps = $props();
</script>

<svg viewBox="0 0 100 100">
    <rect x="0" y="0" width="100" height="100" rx="30" ry="30" />
    <text x="50%" y="75" text-anchor="middle">
        {key}
    </text>
</svg>

<style>
    svg {
        width: 20px;
        height: 20px;
    }

    rect {
        stroke: white;
        stroke-width: 10px;
        fill: #aaaaaa;
    }

    text {
        font-size: 80px;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
</style>
