<script>
	import * as m from '$lib/paraglide/messages';
	import Navbar from './Navbar.svelte';
</script>

<svelte:head>
	<title>{m.title()}</title>
	<meta property="og:title" content={m.title()} />
	<meta property="og:url" content="https://minatoaqua.ch" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://cdn.holoen.fans/hefw/media/aquairo_comp.jpg" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="theme-color" content="#B9DFF4" />
	<meta
		name="description"
		content={m.description()}
	/>
	<meta
		name="og:description"
		content={m.description()}
	/>
</svelte:head>

<header>
	<Navbar />
</header>
