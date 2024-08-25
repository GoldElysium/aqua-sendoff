<script lang="ts">
	import { onMount, tick } from 'svelte';
	import type { YearlyTimelineData } from '$lib/types/types';
	import TimelineCard from './TimelineCard.svelte';

	export let sectionRefs: HTMLDivElement[] = [];
	export let timelineData: YearlyTimelineData[];
	export let layoutType: 'horizontal' | 'vertical' = 'horizontal';

	let isInView: boolean[] = [];

	const checkInView = () => {
		const middlePoint = window.innerHeight / 2;
		sectionRefs.forEach(async (section, index) => {
			if (section) {
				const rect = section.getBoundingClientRect();
				if (rect.top < middlePoint && rect.bottom > middlePoint) {
					if (!isInView[index]) {
						isInView = [
							...isInView.slice(0, index),
							true,
							...isInView.slice(index + 1)
						];
						await tick();
						console.log('in view', index);
					}
				}
			}
		});
	};

	onMount(() => {
		isInView = Array(timelineData.length).fill(false);
		window.addEventListener('scroll', checkInView);
		checkInView();
		return () => {
			window.removeEventListener('scroll', checkInView);
		};
	});
</script>

<div class="mt-10">
	{#each timelineData as yearData, year_index}
		<div class="m-auto" id={`year-${yearData.year}`} bind:this={sectionRefs[year_index]}>
			<div
				class="flex flex-col items-center {layoutType === 'vertical' && 'gap-8'}"
				id="section-container"
			>
				{#each yearData.events as item, i}
					<div
						class="w-[80%] flex {layoutType === 'horizontal'
							? (yearData.year + i) % 2 !== 0
								? 'justify-end'
								: 'justify-start'
							: ''} pointer-events-none {i !== 0 && '-mt-12'}"
						id="card-container"
					>
						<div class={layoutType === 'horizontal' ? 'w-[44%]' : ''}>
							{#if i === 0}
								<h2
									class="text-3xl font-bold text-foreground-pink-accent py-12 transition-section
									{layoutType === 'horizontal' ? (year_index % 2 !== 0 ? 'text-start' : 'text-end') : 'text-center'}"
									id={`year-heading-${yearData.year}`}
									class:invisible-left={year_index % 2 !== 0 &&
										!isInView[year_index]}
									class:invisible-right={year_index % 2 === 0 &&
										!isInView[year_index]}
									class:visible={isInView[year_index]}
								>
									{yearData.year}
								</h2>
							{/if}

							<TimelineCard {item} isRight={false} isVisible={isInView[year_index]} />
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.invisible {
		opacity: 0;
		transform: translateX(-100%);
	}

	.visible {
		opacity: 1;
		transform: translateX(0);
	}
</style>
