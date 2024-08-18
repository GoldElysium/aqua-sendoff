<script lang="ts">
	import type { CreditGroup } from '$lib/types/types';
	export let data: CreditGroup;
</script>

<p class="pt-6 font-extrabold text-lg">{data.groupName}</p>
{#each data.member as inside, index}
	<p>{inside}</p>
{/each}
