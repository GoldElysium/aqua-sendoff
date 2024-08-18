<script lang="ts">
	import { onMount } from 'svelte';
	import getTempTimelineData from '$lib/js/getTempTimelineData';
	import type { YearlyTimelineData } from '$lib/types/types';
	import TimelineProgress from './TimelineProgressHorizontal.svelte';
	import TimelineHorizontal from './TimelineHorizontal.svelte';
	import TimelineVertical from './TimelineVertical.svelte';
	import TimelineProgressVertical from './TimelineProgressVertical.svelte';

	export let timelineData: YearlyTimelineData[] = getTempTimelineData();

	let sectionRefs: HTMLDivElement[] = [];
	let timelineProgress: TimelineProgress; // Reference to the TimelineProgress component
	let layoutType = 'horizontal';

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

	const updateLayout = () => {
		layoutType = window.innerWidth >= 768 ? 'horizontal' : 'vertical';
	};

	onMount(() => {
		updateLayout();
		window.addEventListener('scroll', onScroll);
		window.addEventListener('resize', updateLayout);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', updateLayout);
		};
	});
</script>

<!-- Progress Bar -->

<!-- Timeline Content -->
<div id="timeline-section" class="">
	<div class="flex flex-col items-center justify-center m-5 gap-2">
		<h1 class="text-4xl font-bold">It's been a long journey</h1>
		<h2 class="text-lg">7 years of voyage</h2>
	</div>
	{#if layoutType === 'horizontal'}
		<TimelineProgress bind:this={timelineProgress} {timelineData} />
		<TimelineHorizontal {timelineData} {sectionRefs} />
	{/if}

	{#if layoutType === 'vertical'}
		<div class="flex">
			<TimelineProgressVertical bind:this={timelineProgress} {timelineData} />
			<TimelineVertical {timelineData} {sectionRefs} />
		</div>
	{/if}
</div>

<style>
</style>
