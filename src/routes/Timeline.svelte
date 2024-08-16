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

<!-- Timeline Content -->
<div id="timeline-section" class="">
	<div class="flex flex-col items-center justify-center m-5 gap-2">
		<h1 class="text-4xl font-bold">It's been a long journey</h1>
		<h2 class="text-lg">7 years of voyage</h2>
	</div>
	<TimelineProgress bind:this={timelineProgress} {timelineData} />
	<div class="mt-10">
		{#each timelineData as yearData, index}
			<!-- Year Section -->
			<div class="flex flex-col items-center" bind:this={sectionRefs[index]}>
				<div id={`year-${yearData.year}`}>
					<div class="flex flex-col items-center gap-10">
						{#each yearData.events as item, i}
							<div
								class="w-[80%] flex {(yearData.year + i) % 2 !== 0
									? 'justify-end'
									: 'justify-start'}"
							>
								<div class="w-[50%]">
									{#if i === 0}
										<h2
											class="text-3xl font-bold m-16 {(yearData.year + i) %
												2 !==
											0
												? 'text-start'
												: 'text-end'}"
										>
											{yearData.year}
										</h2>
									{/if}

									<TimelineCard {item} isRight={(yearData.year + i) % 2 !== 0} />
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
</style>
