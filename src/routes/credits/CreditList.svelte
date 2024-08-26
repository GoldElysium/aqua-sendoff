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
	const localLizedMessage = (message: string) => {
		// @ts-ignore
		return m[message] ? m[message]() : message;
	};
</script>

<div>
	<p class="text-center text-6xl text-white py-16">{localLizedMessage(credits.groupName)}</p>
	<div class="grid {getGridColsStyle(credits.data.length)} sm:grid-cols-2 gap-4">
		{#each credits.data as creditData}
			<div>
				<p class="font-extrabold text-center text-2xl text-white">{creditData.role}</p>
				<div class="text-center flex flex-col">
					{#each creditData.members as member}
						<a
							href={social[member]}
							target="_blank"
							class="font-bold text-lg text-foreground-blue">{member}</a
						>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
