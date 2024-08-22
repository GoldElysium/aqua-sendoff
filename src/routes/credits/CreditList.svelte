<script lang="ts">
	import CreditListMember from './CreditListMember.svelte';
	import type { CreditGroup } from '$lib/types/types';
	import { onMount } from 'svelte';

	export let credits: CreditGroup;

	const getGridColsStyle = (numOfRoles: number) => {
		if (numOfRoles > 3) {
			return 'grid-cols-4';
		}

		return 'grid-cols-2';
	};
</script>

<div class="">
	<p class="text-center text-6xl text-white py-16">{credits.groupName}</p>
	<div class="grid {getGridColsStyle(credits.data.length)} gap-4">
		{#each credits.data as creditData}
			<div>
				<p class="font-extrabold text-center text-2xl text-white">{creditData.role}</p>
				<div class="text-center">
					{#each creditData.members as member}
						<p class="font-bold text-lg text-foreground-blue">{member}</p>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
