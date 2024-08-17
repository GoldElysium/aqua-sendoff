<script lang="ts">
	import dateToDMY from '$lib/js/dateToDMY';
	import type { TimelineData } from '$lib/types/types';
	export let item: TimelineData;
</script>

<div class="w-full flex flex-col gap-4 items-center">
	<div class="text-center">
		<p class="text-sm">{dateToDMY(item.date)}</p>
		<h2 class="text-lg">{item.title}</h2>
		<p class="mt-4">{item.content}</p>
	</div>
	<div class="grid">
		{#each item.images as image}
			<img src={image.src} alt={image.alt} height={image.height} width={image.width} />
		{/each}
	</div>
</div>

<style>
</style>
