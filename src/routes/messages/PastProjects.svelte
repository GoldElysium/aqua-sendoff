<script lang="ts">
	import { scrollPos } from '$lib/scrollStore';
	import type { ProjectData } from '$lib/types/types';
	import AnchorScroll from './AnchorScroll.svelte';
	import PastProjectCard from './PastProjectCard.svelte';
	import * as m from '$lib/paraglide/messages';

	export let data: ProjectData[];
	const colors = ['pink', 'blue', 'yellow'] as const;
	let sectionRef: HTMLElement;
</script>

<section class="group flex flex-col items-center gap-4" bind:this={sectionRef}>
	<!-- Submissions -->
	<h1 class="text-5xl z-10 mb-8 mt-16">{m.pastProjects()}</h1>
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

{#if $scrollPos.section === 'ms'}
	<AnchorScroll targetElement={sectionRef} section="msFooter" direction="bottom"></AnchorScroll>
{/if}
