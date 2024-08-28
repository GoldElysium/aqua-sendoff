<script lang="ts">
	import type { PageData } from './$types';
	import FanSubmissions from './FanSubmissions.svelte';
	import { navbarOptions } from '$lib/navbar';
	import PastProjects from './PastProjects.svelte';
	import MessagesFooter from './MessagesFooter.svelte';
	import Title from './Title.svelte';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';
	import { scrollPos } from '$lib/scrollStore';
	import AnchorScroll from './AnchorScroll.svelte';

	// Prefilled by server data; assuming the data is sorted by server side code.
	// Data from the server is autofilled into this variable.
	// Access the actual data with the "data" member.
	export let data: PageData;

	let submissionsSection: HTMLDivElement;

	navbarOptions.set({
		colorScheme: 'light'
	});

	onMount(() => {
		const handler = () => {
			if (submissionsSection.offsetTop < window.scrollY) {
				navbarOptions.set({
					colorScheme: 'dark'
				});
			} else {
				navbarOptions.set({
					colorScheme: 'light'
				});
			}
		};

		window.addEventListener('scroll', handler);

		scrollPos.set({
			section: 'ms'
		});

		return () => {
			window.removeEventListener('scroll', handler);
		};
	});
</script>

<Title />

<div class="grid place-items-center text-white" id="background" bind:this={submissionsSection}>
	<div class="pt-8 w-full flex flex-col justify-center items-center" id="content">
		<div class="max-w-[96rem] w-full flex flex-col items-center">
			<FanSubmissions data={data.submissions} />
			<PastProjects data={data.projectData} />
		</div>
		<MessagesFooter />
	</div>
</div>

{#if $scrollPos.section === 'msFooter'}
	<AnchorScroll targetElement={submissionsSection} section="ms" direction="top"></AnchorScroll>
{/if}

<style>
	:root {
		background: #2b35a0;
	}

	#content {
		background: linear-gradient(180deg, #ffc387 0%, #dba166 100%);
	}
</style>
