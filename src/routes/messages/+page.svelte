<script lang="ts">
	import type { PageData } from './$types';
	import FanSubmissions from './FanSubmissions.svelte';
	import { navbarOptions } from '$lib/navbar';
	import PastProjects from './PastProjects.svelte';
	import MessagesFooter from './MessagesFooter.svelte';
	import Title from './Title.svelte';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';

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

		return () => {
			window.removeEventListener('scroll', handler);
		};
	});
</script>

<Title />

<div class="grid place-items-center text-white" id="background" bind:this={submissionsSection}>
	<div class="pt-8 w-full flex flex-col justify-center items-center" id="content">
		<div class="max-w-[96rem] w-full flex flex-col items-center">
			<h1 class="text-3xl font-medium z-10">{m.videoHeader()}</h1>
			<div class="rounded-md w-10/12 my-16 aspect-video overflow-hidden" id="video-container">
				<video class="w-full h-full" src=""></video>
			</div>
			<h1 class="text-3xl z-10 mb-8">{m.messagesHeader()}</h1>
			<FanSubmissions data={data.submissions} />
			<h1 class="text-5xl z-10 mb-8 mt-16">{m.pastProjects()}</h1>
			<PastProjects data={data.projectData} />
		</div>
		<MessagesFooter />
	</div>
</div>

<style>
	:root {
		background: #2b35a0;
	}
	h1 {
		color: #2e3191;
	}
	#content {
		background: linear-gradient(180deg, #ffc387 0%, #dba166 100%);
	}
	#video-container {
		border: 5px solid #ffd6ac;
	}
</style>
