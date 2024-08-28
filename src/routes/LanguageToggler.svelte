<script lang="ts">
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { LanguageOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime';
	import { i18n } from '$lib/i18n';

	export let colorScheme = 'dark';

	const langMap = {
		en: 'English',
		ja: '日本語',
		zh: '中文'
	};
</script>

<div>
	<Button class="h-fit !p-2">
		<LanguageOutline class="size-6 transition-colors {colorScheme === 'dark' ? 'text-foreground-blue-accent' : 'text-white'}" />
	</Button>
	<Dropdown>
		{#each availableLanguageTags as language}
			<DropdownItem
				href={i18n.route($page.url.pathname)}
				hreflang={language}
				rel="alternate"
				aria-current={language === languageTag() ? 'current' : undefined}
				class="flex gap-2 items-center"
			>
				<img src="/assets/lang/{language}.svg" alt="" class="size-6" />
				{langMap[language]}
			</DropdownItem>
		{/each}
	</Dropdown>
</div>
