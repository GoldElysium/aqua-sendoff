<script lang="ts">
	import type { PageData } from './$types';
	import FanSubmissions from './FanSubmissions.svelte';
	import { navbarOptions } from '$lib/navbar';
	import PastProjects from './PastProjects.svelte';
	import MessagesFooter from './MessagesFooter.svelte';
	import Title from './Title.svelte';

	// Prefilled by server data; assuming the data is sorted by server side code.
	// Data from the server is autofilled into this variable.
	// Access the actual data with the "data" member.
	export let data: PageData;

	navbarOptions.set({
		colorScheme: 'light'
	});
</script>

<Title />

<div class="grid place-items-center text-white" id="background">
	<div class="pt-8 w-full flex flex-col justify-center items-center" id="content">
		<div class="max-w-[96rem] w-full flex flex-col items-center">
			<h1 class="text-3xl font-medium z-10">from the crew, for Aku-tan</h1>
			<div class="rounded-md w-10/12 my-16 aspect-video overflow-hidden" id="video-container">
				<video class="w-full h-full" src=""></video>
			</div>
			<h1 class="text-3xl z-10 mb-8">Creations for you</h1>
			<FanSubmissions data={data.submissions} />
			<h1 class="text-3xl z-10 mb-8 mt-16">Past Projects</h1>
			<PastProjects />
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
