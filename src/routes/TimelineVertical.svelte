<script lang="ts">
	import type { YearlyTimelineData } from '$lib/types/types';
	export let sectionRefs: HTMLDivElement[] = [];
	export let timelineData: YearlyTimelineData[];
	import TimelineCardVertical from './TimelineCardVertical.svelte';
</script>

<div class="w-[85%] flex flex-col">
	{#each timelineData as yearData, index}
		<!-- Year Section -->
		<div class="w-full" bind:this={sectionRefs[index]} id={`year-${yearData.year}`}>
			<h2 class="text-3xl text-center font-bold">
				{yearData.year}
			</h2>
			<div class="flex flex-col gap-4">
				{#each yearData.events as item}
					<TimelineCardVertical {item} />
				{/each}
			</div>
		</div>
	{/each}
</div>
