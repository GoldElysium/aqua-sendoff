<script lang="ts">
	import type { PageData } from './$types';
	import FanSubmissions from './FanSubmissions.svelte';

	// Prefilled by server data; assuming the data is sorted by server side code.
	// Data from the server is autofilled into this variable.
	// Access the actual data with the "data" member.
	export let data: PageData;
</script>

<div class="grid place-items-center">
	<div class=" max-w-[96rem] py-8">
		<FanSubmissions data={data.data} />
	</div>
</div>


