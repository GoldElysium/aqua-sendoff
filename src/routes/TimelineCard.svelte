<script lang="ts">
	import LexicalRenderer from '$lib/components/LexicalRenderer.svelte';
	import getDateString from '$lib/js/dateToDMY';
	import { languageTag } from '$lib/paraglide/runtime';
	import type { EventWithImages } from '$lib/types/types';
	export let item: EventWithImages;
	export let isRight: boolean;
	export let isVisible: boolean;

	let images = item.images;
</script>

<div
	class="w-full flex flex-col gap-4 items-center pointer-events-auto transition-section"
	class:invisible-left={!isRight && !isVisible}
	class:invisible-right={isRight && !isVisible}
	class:visible={isVisible}
>
	<div class="{isRight ? 'order-2' : 'order-1'} text-container w-full">
		<p class="text-sm text-foreground-blue">
			{getDateString(new Date(item.date), languageTag())}
		</p>
		<h2 class="text-xl font-bold">{item.title}</h2>

		<div class="pt-4">
			<LexicalRenderer nodes={item.content.root.children} />
		</div>
	</div>

	<div class="{isRight ? 'order-1' : 'order-2'} grid image-container">
		{#each images as image}
			<img src={image.optimized.src} alt={image.optimized.alt} decoding="async" loading="lazy" class="rounded" />
		{/each}
	</div>
</div>

<style>
</style>
