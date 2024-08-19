<script lang="ts">
	export let projectName: string;
	export let url: string;
	export let color: 'pink' | 'blue' | 'yellow' = 'pink';
</script>

<a href={url} class="flex flex-col gap-4 p-4 rounded-md {color}" id="card" target="_blank">
	<div class="flex justify-between">
		<h2 class="text-lg">{projectName}</h2>
		<img src="/assets/open_external.svg" alt="Open in new tab" class="w-5 h-5" />
	</div>
	<img src="/assets/Placeholder_Vertical.png" alt={projectName} />
</a>

<style>
	h2 {
		color: #2e3191;
	}
	#card {
		background-color: #ffecd9;
		border: 5px solid;
	}
	#card.pink {
		border-color: #e284af;
	}
	#card.blue {
		border-color: #2e3191;
	}
	#card.yellow {
		border-color: #f7bf52;
	}
	img {
		border-radius: 4px;
		border: 3px solid white;
	}
</style>
