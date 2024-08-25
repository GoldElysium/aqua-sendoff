<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { ArtSubmissionData } from '$lib/types/types';
	import SubmissionCard from './SubmissionCard.svelte';
	import Toggler from './Toggler.svelte';

	export let data: ArtSubmissionData[];

	// Divide data into three columns
	let col1: ArtSubmissionData[] = [];
	let col2: ArtSubmissionData[] = [];
	let col3: ArtSubmissionData[] = [];

	const list = [col1, col2, col3];

	data.forEach((item, index) => {
		list[index % 3].push(item);
	});

	const colors = ['blue', 'yellow', 'pink'] as const;
	const getColor = (index: number) => colors[index % colors.length];
</script>

<section class="group flex flex-col items-center">
	<div class="flex md:gap-4 gap-2">
		<Toggler label={m.messages()} id="show-messages" />
		<Toggler label={m.artworks()} id="show-artwork" />
		<Toggler label={m.photos()} id="show-pictures" />
		<Toggler label={m.videos()} id="show-videos" />
	</div>
	<!-- Submissions -->
	<div class="flex justify-center py-8 w-10/12">
		<div class="grid grid-cols-1 md:grid-cols-3 max-w-[96rem] gap-8">
			<!-- Column 1 -->
			<div class="flex flex-col gap-8">
				{#each col1 as item, i}
					<SubmissionCard data={item} color={getColor(i)} />
				{/each}
			</div>
			<!-- Column 2 -->
			<div class="flex flex-col gap-8">
				{#each col2 as item, i}
					<SubmissionCard data={item} color={getColor(i + 2)} />
				{/each}
			</div>
			<!-- Column 3 -->
			<div class="flex flex-col gap-8">
				{#each col3 as item, i}
					<SubmissionCard data={item} color={getColor(i - 1)} />
				{/each}
			</div>
		</div>
	</div>
</section>
