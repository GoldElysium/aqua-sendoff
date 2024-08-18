<script lang="ts">
	import LanguageToggler from './LanguageToggler.svelte';
	import Logo from './Logo.svelte';
	import NavItem from './NavItem.svelte';
</script>

<nav class="flex justify-between px-5 py-3 absolute t-0 w-full">
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
