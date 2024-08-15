<script lang="ts">
	import LanguageToggler from './LanguageToggler.svelte';
	import Logo from './Logo.svelte';
	import NavItem from './NavItem.svelte';
</script>

<nav class="flex justify-between">
	<Logo></Logo>
	<div class="flex gap-2">
		<NavItem href="/">Timeline</NavItem>
		<NavItem href="/messages">Messages</NavItem>
		<NavItem href="/credits">Credits</NavItem>
		<LanguageToggler></LanguageToggler>
	</div>
</nav>
