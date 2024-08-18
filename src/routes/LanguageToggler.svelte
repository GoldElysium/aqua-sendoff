<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { LanguageOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime';
	import { i18n } from '$lib/i18n';

	const langMap = {
		en: 'English',
		ja: '日本語',
		zh: '中文'
	};
</script>

<div class="text-foreground-blue-accent">
	<Button class="h-fit text-foreground-blue-accent !p-2">
		<LanguageOutline class="size-6 text-foreground-blue-accent" />
	</Button>
	<Dropdown>
		{#each availableLanguageTags as language}
			<DropdownItem
				href={PUBLIC_BASE_URL + i18n.resolveRoute(i18n.route($page.url.pathname), language)}
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
