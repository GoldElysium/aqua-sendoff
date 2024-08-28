<script lang="ts">
	import type { PageData } from './$types';
	import CreditList from './CreditList.svelte';
	import CreditFooter from './CreditFooter.svelte';
	import Title from '../messages/Title.svelte';
	import { navbarOptions } from '$lib/navbar';
	import { onMount } from 'svelte';
	import Ship from '../Ship.svelte';
	import FrontPage from '../FrontPage.svelte';
	import { scrollPos } from '$lib/scrollStore';
	import AnchorScroll from '../messages/AnchorScroll.svelte';

	export let data: PageData;

	let creditSection: HTMLDivElement;

	navbarOptions.set({
		colorScheme: 'dark'
	});

	onMount(() => {
		const handler = () => {
			if (creditSection.offsetTop < window.scrollY) {
				navbarOptions.set({
					colorScheme: 'light'
				});
			} else {
				navbarOptions.set({
					colorScheme: 'dark'
				});
			}
		};

		scrollPos.set({
			section: 'crHome'
		});

		window.addEventListener('scroll', handler);

		return () => {
			window.removeEventListener('scroll', handler);
		};
	});
</script>

<FrontPage targetElement={creditSection}>
	<div
		class="absolute -mt-8 inset-y-0 left-1/2 w-[0.25%] -z-0"
		style="background: #2e3191;"
	></div>
</FrontPage>

<div
	class="relative pb-40"
	style="background: linear-gradient(180deg, #4B72D4 0%, #2B35A0 100%);"
	bind:this={creditSection}
>
	<div
		class="absolute -top-32 inset-y-0 left-1/2 w-[0.25%] bg-gray-400 -z-0 opacity-70"
		style="background: linear-gradient(#2e3191, #1d1f5c40, #10113340, #0e0f2b);"
	></div>
	<div class="relative -z-0 md:w-[80%] m-auto">
		{#each data.credits.groups as group}
			{#if !group.disabled}
				<CreditList credits={group} social={data.credits.social}></CreditList>
			{/if}
		{/each}
	</div>
</div>

<Title />

<CreditFooter />

{#if $scrollPos.section === 'crFooter'}
	<AnchorScroll targetElement={creditSection} section="cr" direction="top"></AnchorScroll>
{/if}
