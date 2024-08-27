<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { ArtSubmissionData } from '$lib/types/types';
	import SubmissionCard from './SubmissionCard.svelte';
	import Toggler from './Toggler.svelte';

	export let data: ArtSubmissionData[];
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
		<div class="md:columns-2 lg:columns-3 max-w-[96rem]" style="column-gap: 40px;">
			{#each data as item, i}
				<SubmissionCard data={item} color={getColor(i)} />
			{/each}
		</div>
	</div>
</section>
