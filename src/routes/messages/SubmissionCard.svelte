<script lang="ts">
	import type { ArtSubmissionData } from '$lib/types/types';

	export let data: ArtSubmissionData;

	export let color: 'pink' | 'blue' | 'yellow' = 'pink';

	// Function to generate a random rotation angle between -3 and 3 degrees
	function getRandomRotation(maxRotation: number = 3): number {
		return Math.floor(Math.random() * (maxRotation * 2 + 1)) - maxRotation;
	}

	let rotationAngle = getRandomRotation();
</script>

<div
	class="p-4 rounded-md h-fit {color}"
	class:message={data.message.length > 0}
	class:artwork={data.images.length > 0 &&
		data.images[0].type === 'image' &&
		data.images[0].subtype === 'artwork'}
	class:photo={data.images.length > 0 &&
		data.images[0].type === 'image' &&
		data.images[0].subtype === 'picture'}
	class:video={data.images.length > 0 && data.images[0].type === 'video'}
	style="transform: rotate({rotationAngle}deg);"
	id="card"
>
	<h1 class="text-2xl mb-6">{data.author}</h1>
	<p>{data.message}</p>
	<div class="grid place-items-center">
		{#each data.images as image}
			<img src={image.src} alt={image.alt} class="w-11/12 h-auto" />
		{/each}
	</div>
</div>

<style>
	h1,
	p {
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
