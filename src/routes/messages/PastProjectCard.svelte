<script lang="ts">
	import { localizedMessage } from '$lib/js/localizedMessage';
	import type { SingleProject } from '$lib/types/types';

	export let data: SingleProject;
	export let color: 'pink' | 'blue' | 'yellow' = 'pink';
</script>

<a
	href={data.url}
	class="flex flex-col gap-4 p-4 rounded-md {color} md:w-[30vw] w-[90vw] mb-4"
	id="card"
	target="_blank"
	rel="external"
>
	<div class="flex justify-between">
		<h2 class="text-lg">{localizedMessage(data.name)}</h2>
		{#if data.url}
			<img
				src="/assets/open_external.svg"
				alt="Open in new tab"
				class="w-5 h-5"
				loading="lazy"
				decoding="async"
			/>
		{/if}
	</div>
	{#if data.image}
		<img src={data.image} alt="{data.name} image" class="" loading="lazy" decoding="async" />
	{/if}
	{#if data.video}
		<iframe src={data.video} class="w-full aspect-video" title={data.name} loading="lazy"
		></iframe>
	{/if}
</a>

<style>
	h2 {
		color: #2e3191;
	}
	#card {
		background-color: #ffecd9;
		border: 5px solid;
	}
	#card.pink {
		border-color: #e284af;
	}
	#card.blue {
		border-color: #2e3191;
	}
	#card.yellow {
		border-color: #f7bf52;
	}
	img {
		border-radius: 4px;
		border: 3px solid white;
	}
</style>
