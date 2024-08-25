<script lang="ts">
	import { navbarOptions } from '$lib/navbar';
	import LanguageToggler from './LanguageToggler.svelte';
	import Logo from './Logo.svelte';
	import NavItem from './NavItem.svelte';
	import * as m from '$lib/paraglide/messages';

	$: colorScheme = $navbarOptions.colorScheme;
</script>

<nav
	class="flex justify-between px-5 py-3 fixed top-0 z-20 w-full backdrop-blur-sm {colorScheme ===
	'dark'
		? 'text-foreground-blue-accent'
		: 'text-white'}"
>
	<a href="/">
		<Logo
			class="transition-colors {colorScheme === 'dark'
				? 'fill-foreground-blue-accent'
				: 'fill-white'}"
		/>
	</a>
	<div class="flex gap-5 items-center">
		<a href="/" class="h-fit transition-colors">{m.timeline()}</a>
		<a href="/messages" class="h-fit transition-colors" on:click={() => console.log('asdsad')}
			>{m.messages()}</a
		>
		<a href="/credits" class="h-fit transition-colors">{m.credits()}</a>

		<LanguageToggler {colorScheme} />
	</div>
</nav>
