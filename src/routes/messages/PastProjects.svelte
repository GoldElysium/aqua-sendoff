<script lang="ts">
	import type { ProjectData } from '$lib/types/types';
	import PastProjectCard from './PastProjectCard.svelte';
	export let data: ProjectData[];
	const colors = ['pink', 'blue', 'yellow'] as const;
</script>

<section class="group flex flex-col items-center gap-4">
	<!-- Submissions -->

	{#each data as item}
		<div class="flex flex-col items-center gap-2">
			<h1 class="text-3xl font-medium">{item.year}</h1>
			<div class="md:flex gap-2">
				{#each item.projects as project, j}
					<PastProjectCard data={project} color={colors[j % colors.length]} />
				{/each}
			</div>
		</div>
	{/each}
</section>
