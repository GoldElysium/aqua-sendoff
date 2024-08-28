<script lang="ts">
	import { localizedMessage } from '$lib/js/localizedMessage';
	import type { SocialMap, CreditGroup } from '$lib/types/types';

	export let credits: CreditGroup;
	export let social: SocialMap;

	const getGridColsStyle = (numOfRoles: number) => {
		if (numOfRoles > 3) {
			return 'md:grid-cols-4';
		}

		return 'md:grid-cols-2';
	};

	const hasEightRoles = (group: CreditGroup) => {
		// @ts-ignore
		return group.data.length === 8;
	};
</script>

<div>
	<p class="text-center md:text-6xl text-4xl text-white py-16">
		{localizedMessage(credits.groupName + 'Group')}
	</p>
	<div
		class="{!hasEightRoles(credits) && 'not-full'} grid-container {getGridColsStyle(
			credits.data.length
		)} gap-10 min-h-[40vh]"
	>
		{#each credits.data as creditData}
			<div class="grid-item">
				<p class="font-extrabold text-center md:text-2xl text-xl text-white">
					{localizedMessage(creditData.role + 'Role')}
				</p>
				<div class="text-center flex flex-col">
					{#each creditData.members as member}
						<a
							href={social[member]}
							target="_blank"
							rel="external"
							class="font-bold text-lg text-foreground-blue {social[member] &&
								'underline'} w-fit m-auto">{member}</a
						>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.grid-container {
		display: grid;
	}

	@media (min-width: 768px) {
		.not-full.grid-container > .grid-item:nth-child(5) {
			grid-column: span 2;
		}

		.not-full.grid-container > .grid-item:nth-child(6) {
			grid-column: span 2;
		}
	}
</style>
