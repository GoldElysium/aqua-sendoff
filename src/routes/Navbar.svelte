<script lang="ts">
	import { createLink } from '../lib/i18n-utils';
	import LanguageToggler from './LanguageToggler.svelte';
	import Logo from './Logo.svelte';
	import NavItem from './NavItem.svelte';
</script>

<nav class="flex justify-between mx-5 my-3">
	<a href={createLink('/')}>
		<Logo></Logo>
	</a>
	<div class="flex gap-5 items-center">
		<NavItem href={createLink('/')}>Timeline</NavItem>
		<NavItem href={createLink('/messages')}>Messages</NavItem>
		<NavItem href={createLink('/credits')}>Credits</NavItem>
		<LanguageToggler></LanguageToggler>
	</div>
</nav>
