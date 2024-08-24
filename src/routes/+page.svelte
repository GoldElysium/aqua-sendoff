<script lang="ts">
	import type { PageData } from './$types';
	import Footer from './Footer.svelte';
	import TimelineContainer from './TimelineContainer.svelte';

	export let data: PageData;
</script>

<TimelineContainer timelineData={data.events} />

<Footer />
