<script lang="ts">
	import dateToDMY from '$lib/js/dateToDMY';
	import type { TimelineData } from '$lib/types/types';
	export let item: TimelineData;
	export let isRight: boolean;
</script>

<div class="w-[80%] flex {isRight ? 'justify-end' : 'justify-start'}">
	<div class="w-[45%] flex gap-4 items-center">
		<div class="{isRight ? 'order-2' : 'order-1'} text-container">
			<p class="text-sm">{dateToDMY(item.date)}</p>
			<h2 class="text-lg">{item.title}</h2>
			<p class="mt-4">{item.content}</p>
		</div>
		<div class="{isRight ? 'order-1' : 'order-2'} grid image-container">
			{#each item.images as image}
				<img src={image.src} alt={image.alt} height={image.height} width={image.width} />
			{/each}
		</div>
	</div>
</div>

<style>
</style>
