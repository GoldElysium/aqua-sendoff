<script lang="ts">
	import type { YearlyTimelineData } from '$lib/types/types';
	import TimelineCard from './TimelineCard.svelte';

	export let sectionRefs: HTMLDivElement[] = [];
	export let timelineData: YearlyTimelineData[];
	export let layoutType: 'horizontal' | 'vertical' = 'horizontal';

	// Reactive variables for alignment
</script>

<div class="mt-10">
	{#each timelineData as yearData, index}
		<div class="m-auto" id={`year-${yearData.year}`} bind:this={sectionRefs[index]}>
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
							: ''} {i !== 0 &&
							layoutType === 'horizontal' &&
							'-mt-32'} pointer-events-none"
						id="card-container"
					>
						<div class={layoutType === 'horizontal' ? 'w-[44%]' : ''}>
							{#if i === 0}
								<h2
									class="text-3xl font-bold text-foreground-pink-accent py-12
									{layoutType === 'horizontal' ? (i % 2 !== 0 ? 'text-end' : 'text-start') : 'text-center'}"
									id="year-heading"
								>
									{yearData.year}
								</h2>
							{/if}

							<TimelineCard
								{item}
								isRight={layoutType === 'vertical'
									? false
									: (yearData.year + i) % 2 !== 0}
							/>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
