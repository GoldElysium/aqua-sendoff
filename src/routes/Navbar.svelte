<script lang="ts">
	import LanguageToggler from './LanguageToggler.svelte';
	import Logo from './Logo.svelte';
	import NavItem from './NavItem.svelte';

	export let colorScheme: 'dark' | 'light' = 'dark';
</script>

<nav class="flex justify-between px-5 py-3 fixed top-0 z-20 w-full {colorScheme === 'dark' ? 'text-foreground-blue-accent' : 'text-white'}">
	<a href="/">
		<Logo />
	</a>
	<div class="flex gap-5 items-center">
		<NavItem href="/">Timeline</NavItem>
		<NavItem href="/messages">Messages</NavItem>
		<NavItem href="/credits">Credits</NavItem>
		<LanguageToggler />
	</div>
</nav>
