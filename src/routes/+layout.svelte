<script>
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';

	import '../app.css';
	import Header from './Header.svelte';
</script>

<Header />

<ParaglideJS {i18n}>
	<slot />
</ParaglideJS>
