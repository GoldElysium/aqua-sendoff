<script lang="ts">
	import LexicalRenderer from '$lib/components/LexicalRenderer.svelte';
	import dateToDMY from '$lib/js/dateToDMY';
	import type { Event, EventMedia } from '$lib/types/CMS';
	export let item: Event;
	export let isRight: boolean;
	export let isVisible: boolean;

	let images = item.images as { image: EventMedia }[];
</script>

<div
	class="w-full flex flex-col gap-4 items-center pointer-events-auto transition-section"
	class:invisible-left={!isRight && !isVisible}
	class:invisible-right={isRight && !isVisible}
	class:visible={isVisible}
>
	<div class="{isRight ? 'order-2' : 'order-1'} text-container">
		<p class="text-sm text-foreground-blue">{dateToDMY(new Date(item.date))}</p>
		<h2 class="text-xl font-bold">{item.title}</h2>

		<div class="pt-4">
			<LexicalRenderer nodes={item.content.root.children} />
		</div>
	</div>

	<div class="{isRight ? 'order-1' : 'order-2'} grid image-container">
		{#each images as image}
			<img src={image.image.url} alt={image.image.alt} class="rounded" />
		{/each}
	</div>
</div>

<style>
</style>
