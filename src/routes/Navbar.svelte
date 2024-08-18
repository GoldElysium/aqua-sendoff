<script lang="ts">
	import LanguageToggler from './LanguageToggler.svelte';
	import Logo from './Logo.svelte';
	import NavItem from './NavItem.svelte';

	export let colorScheme: 'dark' | 'light' = 'dark';
</script>

<<<<<<< HEAD
<nav class="flex justify-between px-5 py-3 fixed t-0 w-full backdrop-blur-sm {colorScheme === 'dark' ? 'text-foreground-blue-accent' : 'text-white'} z-50">
	<a href={createLink('/')}>
=======
<nav class="flex justify-between px-5 py-3 absolute t-0 w-full">
	<a href="/">
>>>>>>> fb88c9d66b685f5c5cdc55638e4c9d4f9dde11c5
		<Logo />
	</a>
	<div class="flex gap-5 items-center">
		<NavItem href="/">Timeline</NavItem>
		<NavItem href="/messages">Messages</NavItem>
		<NavItem href="/credits">Credits</NavItem>
		<LanguageToggler />
	</div>
</nav>
