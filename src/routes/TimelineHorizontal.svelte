<script lang="ts">
	import type { YearlyTimelineData } from '$lib/types/types';
	import TimelineCard from './TimelineCard.svelte';

	export let sectionRefs: HTMLDivElement[] = [];
	export let timelineData: YearlyTimelineData[];
</script>

<div class="mt-10">
	{#each timelineData as yearData, index}
		<!-- Year Section -->
		<div class="flex flex-col items-center" bind:this={sectionRefs[index]}>
			<div id={`year-${yearData.year}`}>
				<div class="flex flex-col items-center">
					{#each yearData.events as item, i}
						<div
							class="w-[80%] flex {(yearData.year + i) % 2 !== 0
								? 'justify-end'
								: 'justify-start'}"
						>
							<div class="w-[46%]">
								{#if i === 0}
									<h2
										class="text-3xl font-bold text-foreground-pink-accent py-12 {yearData.year % 2 !== 0
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
