<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import "./global.css";
    import Header from './header.svelte';

	let { children } = $props();
</script>

<style>
	.main {
		margin-top: 20px;
	}
</style>

<svelte:head>
	<title>dubitable</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<span class="header-class">
	<Header />
</span>

<div class="main">
	{@render children?.()}
</div>
