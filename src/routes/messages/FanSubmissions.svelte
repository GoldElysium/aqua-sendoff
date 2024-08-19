<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { ArtSubmissionData } from '$lib/types/types';
	import SubmissionCard from './SubmissionCard.svelte';

	export let data: ArtSubmissionData[];

	// Divide data into three columns
	let col1: ArtSubmissionData[] = [];
	let col2: ArtSubmissionData[] = [];
	let col3: ArtSubmissionData[] = [];

	data.forEach((item, index) => {
		if (index % 3 === 0) {
			col1.push(item);
		} else if (index % 3 === 1) {
			col2.push(item);
		} else {
			col3.push(item);
		}
	});
</script>

<section class="group flex flex-col items-center">
	<div class="flex gap-4">
		<div class="px-4 py-2 rounded-md">
			<input type="checkbox" checked id="show-messages" />
			<label class="text-center" for="show-messages">{m.messages()}</label>
		</div>
		<div class="px-4 py-2 rounded-md">
			<input type="checkbox" checked id="show-artwork" />
			<label for="show-artwork">{m.artworks()}</label>
		</div>
		<div class="px-4 py-2 rounded-md">
			<input type="checkbox" checked id="show-pictures" />
			<label for="show-pictures">{m.photos()}</label>
		</div>
		<div class="px-4 py-2 rounded-md">
			<input type="checkbox" checked id="show-videos" />
			<label for="show-videos">{m.videos()}</label>
		</div>
	</div>
	<!-- Submissions -->
	<div class="flex justify-center py-8 w-10/12">
		<div class="flex max-w-[96rem] gap-8">
			<!-- Column 1 -->
			<div class="flex flex-col gap-8 w-1/3">
				{#each col1 as item}
					<SubmissionCard data={item} />
				{/each}
				<SubmissionCard
					data={{
						id: 'test',
						author: 'Yuka',
						authorIcon: undefined,
						message:
							'Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet',
						images: []
					}}
				/>
				<SubmissionCard
					color="yellow"
					data={{
						id: 'test',
						author: 'Yuka',
						authorIcon: undefined,
						message: '',
						images: [
							{
								src: '/assets/Placeholder_Vertical.png',
								alt: 'Placeholder Vertical',
								width: 607,
								height: 708,
								type: 'image',
								subtype: 'artwork'
							}
						]
					}}
				/>
			</div>
			<!-- Column 2 -->
			<div class="flex flex-col gap-8 w-1/3">
				{#each col2 as item}
					<SubmissionCard data={item} />
				{/each}
				<SubmissionCard
					color="yellow"
					data={{
						id: 'test',
						author: 'Yuka',
						authorIcon: undefined,
						message:
							'Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet',
						images: [
							{
								src: '/assets/Placeholder_Vertical.png',
								alt: 'Placeholder Vertical',
								width: 607,
								height: 708,
								type: 'image',
								subtype: 'artwork'
							}
						]
					}}
				/>
			</div>
			<!-- Column 3 -->
			<div class="flex flex-col gap-8 w-1/3">
				{#each col3 as item}
					<SubmissionCard data={item} />
				{/each}
				<SubmissionCard
					color="blue"
					data={{
						id: 'test',
						author: 'Yuka',
						authorIcon: undefined,
						message:
							'Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet',
						images: [
							{
								src: '/assets/Placeholder_Horizontal.png',
								alt: 'Placeholder Horizontal',
								width: 720,
								height: 407,
								type: 'image',
								subtype: 'artwork'
							}
						]
					}}
				/>
				<SubmissionCard
					data={{
						id: 'test',
						author: 'Yuka',
						authorIcon: undefined,
						message:
							'Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet Lorem ipsum sin amet',
						images: []
					}}
				/>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	.message {
		@apply group-[:first-child:has(#show-messages:checked)]:block;
	}

	.artwork {
		@apply group-[:first-child:has(#show-artwork:checked)]:block;
	}

	.photo {
		@apply group-[:first-child:has(#show-pictures:checked)]:block;
	}

	.video {
		@apply group-[:first-child:has(#show-videos:checked)]:block;
	}
	label {
		color: #2e3191;
	}
	div :has(input[type='checkbox']) {
		background-color: #ffcd9b;
		border: 3px solid #ffd6ac;
	}
	input[type='checkbox'] {
		background-color: #2e3191;
		border-radius: 4px;
	}
</style>
