<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import getTempTimelineData from '$lib/js/getTempTimelineData';
	import type { YearlyTimelineData } from '$lib/types/types';
	import TimelineCard from './TimelineCard.svelte';
	import TimelineProgress from './TimelineProgress.svelte';

	export let timelineData: YearlyTimelineData[] = getTempTimelineData();

	let sectionRefs: HTMLDivElement[] = [];
	let referencePoints: number[] = [];
	let timelineProgress: TimelineProgress; // Reference to the TimelineProgress component

	// Function to calculate the reference points for each section
	const calculateReferencePoints = () => {
		referencePoints = sectionRefs.map((ref) => ref.getBoundingClientRect().top);
	};

	// Function to handle scroll events
	const onScroll = () => {
		const scrollPos = window.scrollY + referencePoints[0];

		let closestIndex = 0;
		let minDiff = Infinity;

		// Find the closest reference point
		referencePoints.forEach((point, index) => {
			const diff = Math.abs(scrollPos - point);
			if (diff < minDiff) {
				minDiff = diff;
				closestIndex = index;
			}
		});

		// Offset from the current scollPos to the reference point
		const offset =
			scrollPos > referencePoints[closestIndex] && closestIndex < referencePoints.length - 1
				? (scrollPos - referencePoints[closestIndex]) /
					sectionRefs[closestIndex].clientHeight
				: 0;
		// Update the progress component
		if (timelineProgress) {
			timelineProgress.setProgress(closestIndex, offset);
		}
	};

	onMount(() => {
		window.addEventListener('scroll', onScroll);
		calculateReferencePoints();

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
