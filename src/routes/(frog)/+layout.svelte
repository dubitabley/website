<script lang="ts">
    let { children } = $props();
</script>

<svelte:head>
    <title>frogitable</title>
</svelte:head>

{@render children()}
