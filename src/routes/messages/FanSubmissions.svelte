<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { ArtSubmissionData } from '$lib/types/types';

	export let data: ArtSubmissionData[];
</script>

<section class="group">
	<div class="flex gap-4">
		<div class="bg-blue-400 px-4 py-2 rounded-md">
			<input type="checkbox" checked id="show-messages">
			<label for="show-messages">{m.messages()}</label>
		</div>
		<div class="bg-blue-400 px-4 py-2 rounded-md">
			<input type="checkbox" checked id="show-artwork">
			<label for="show-artwork">{m.artworks()}</label>
		</div>
		<div class="bg-blue-400 px-4 py-2 rounded-md">
			<input type="checkbox" checked id="show-pictures">
			<label for="show-pictures">{m.photos()}</label>
		</div>
		<div class="bg-blue-400 px-4 py-2 rounded-md">
			<input type="checkbox" checked id="show-videos">
			<label for="show-videos">{m.videos()}</label>
		</div>
	</div>
	<div class="grid place-items-center py-8">
		<div class="grid max-w-[96rem] grid-cols-4 gap-4">
			{#each data as item}
				<div
					class="p-4 border border-black rounded-md hidden"
					class:message={item.message.length > 0}
					class:artwork={item.images.length > 0 && item.images[0].type === 'image' && item.images[0].subtype === 'artwork'}
					class:photo={item.images.length > 0 && item.images[0].type === 'image' && item.images[0].subtype === 'picture'}
					class:video={item.images.length > 0 && item.images[0].type === 'video'}
				>
					<code>ID: {item.id}</code>
					<p>Author: {item.author}</p>
				</div>
			{/each}
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
</style>
