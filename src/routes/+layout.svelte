<script>
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';
	import * as m from '$lib/paraglide/messages';

	import '../app.css';
	import Header from './Header.svelte';
</script>

<svelte:head>
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

<ParaglideJS {i18n}>
	<Header />
	<slot />
</ParaglideJS>
