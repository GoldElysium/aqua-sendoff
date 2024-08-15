<script lang="ts">
	import type { PageData } from './$types';

	// Prefilled by server data; assuming the data is sorted by server side code.
	// Data from the server is autofilled into this variable.
	// Access the actual data with the "data" member.
	export let data: PageData;
</script>

<div class="grid place-items-center">
	<div class="group max-w-[96rem] py-8">
		<div class="flex gap-4">
			<div class="bg-blue-400 px-4 py-2 rounded-md">
				<input type="checkbox" checked id="show-messages">
				<label for="show-messages">Show messages</label>
			</div>
			<div class="bg-blue-400 px-4 py-2 rounded-md">
				<input type="checkbox" checked id="show-artwork">
				<label for="show-artwork">Show artwork</label>
			</div>
			<div class="bg-blue-400 px-4 py-2 rounded-md">
				<input type="checkbox" checked id="show-pictures">
				<label for="show-pictures">Show pictures</label>
			</div>
			<div class="bg-blue-400 px-4 py-2 rounded-md">
				<input type="checkbox" checked id="show-videos">
				<label for="show-videos">Show videos</label>
			</div>
		</div>
		<div class="grid place-items-center py-8">
			<div class="grid max-w-[96rem] grid-cols-4 gap-4">
				{#each data.data as item}
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
	</div>
</div>

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
