<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import getTempTimelineData from '$lib/js/getTempTimelineData';
	import type { YearlyTimelineData } from '$lib/types/types';
	import TimelineCard from './TimelineCard.svelte';
	import TimelineProgress from './TimelineProgress.svelte';

	export let timelineData: YearlyTimelineData[] = getTempTimelineData();

	let sectionRefs: HTMLDivElement[] = [];
	let timelineProgress: TimelineProgress; // Reference to the TimelineProgress component

	// Function to calculate the reference points for each section
	// Function to handle scroll events
	const onScroll = () => {
		const middlePoint = window.innerHeight / 2;

		let closestIndex = 0;
		let minDiff = Infinity;

		// Find the closest reference point
		sectionRefs.forEach((section, index) => {
			const point = section.getBoundingClientRect().y;
			const diff = Math.abs(middlePoint - point);
			if (diff < minDiff && point < middlePoint) {
				minDiff = diff;
				closestIndex = index;
			}
		});

		if (minDiff === Infinity) {
			return;
		}

		// Offset from the current scollPos to the reference point
		const offset =
			closestIndex < sectionRefs.length - 1
				? minDiff / sectionRefs[closestIndex].clientHeight
				: 0;
		// Update the progress component
		if (timelineProgress) {
			timelineProgress.setProgress(closestIndex, offset);
		}
	};

	onMount(() => {
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<!-- Progress Bar -->
<TimelineProgress bind:this={timelineProgress} {timelineData} />

<!-- Timeline Content -->
<div>
	{#each timelineData as yearData, index}
		<!-- Year Section -->
		<div class="flex flex-col items-center" bind:this={sectionRefs[index]}>
			<h2 class="text-2xl font-bold">{yearData.year}</h2>
			<div id={`year-${yearData.year}`}>
				<div class="flex flex-col items-center">
					{#each yearData.events as item, i}
						<TimelineCard {item} isRight={i % 2 === 0} />
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
</style>
