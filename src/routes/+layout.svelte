<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import "./global.css";
    import Header from './header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>dubitable</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
{@render children?.()}
