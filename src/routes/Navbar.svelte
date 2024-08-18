<script lang="ts">
	import { navbarOptions } from '$lib/navbar';
	import LanguageToggler from './LanguageToggler.svelte';
	import Logo from './Logo.svelte';
	import NavItem from './NavItem.svelte';
	import * as m from '$lib/paraglide/messages';

	let colorSceheme = $navbarOptions.colorScheme;
</script>

<nav class="flex justify-between px-5 py-3 fixed top-0 z-20 w-full backdrop-blur-sm {colorSceheme === 'dark' ? 'text-foreground-blue-accent' : 'text-white'}">
	<a href="/">
		<Logo />
	</a>
	<div class="flex gap-5 items-center">
		<NavItem href="/">{m.timeline()}</NavItem>
		<NavItem href="/messages">{m.messages()}</NavItem>
		<NavItem href="/credits">{m.credits()}</NavItem>
		<LanguageToggler />
	</div>
</nav>
