<script lang="ts">
	import dateToDMY from '$lib/js/dateToDMY';
	import type { TimelineData } from '$lib/types/types';
	export let item: TimelineData;
	export let isRight: boolean;
</script>

<div class="w-full flex gap-4 items-center">
	<div class="{isRight ? 'order-2' : 'order-1'} text-container">
		<p class="text-sm text-foreground-blue">{dateToDMY(item.date)}</p>
		<h2 class="text-xl font-bold">{item.title}</h2>

		<p class="pt-4">{item.content}</p>
	</div>
	<div class="{isRight ? 'order-1' : 'order-2'} grid image-container">
		{#each item.images as image}
			<img src={image.src} alt={image.alt} height={image.height} width={image.width} />
		{/each}
	</div>
</div>

<style>
</style>
