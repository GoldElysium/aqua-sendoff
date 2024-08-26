<script lang="ts">
	import type { SocialMap, CreditGroup } from '$lib/types/types';
	import * as m from '$lib/paraglide/messages';

	export let credits: CreditGroup;
	export let social: SocialMap;

	const getGridColsStyle = (numOfRoles: number) => {
		if (numOfRoles > 3) {
			return 'md:grid-cols-4';
		}

		return 'md:grid-cols-2';
	};
	const localizedMessage = (message: string) => {
		// @ts-ignore
		return m[message] ? m[message]() : message;
	};

	const hasEightRoles = (group: CreditGroup) => {
		// @ts-ignore
		return group.data.length === 8;
	};
</script>

<div>
	<p class="text-center text-6xl text-white py-16">
		{localizedMessage(credits.groupName + 'Group')}
	</p>
	<div
		class="{!hasEightRoles(credits) &&
			'not-full'} grid-container md:grid-cols-4 sm:grid-cols-2 gap-10 min-h-[40vh]"
	>
		{#each credits.data as creditData}
			<div class="grid-item">
				<p class="font-extrabold text-center text-2xl text-white">
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
