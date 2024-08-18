<script lang="ts">
	import type { PageData } from './$types';
	import Footer from './Footer.svelte';
	import TimelineContainer from './TimelineContainer.svelte';

	export let data: PageData;
</script>

<div class="h-screen flex items-center justify-center bg-gray-100" style="background: linear-gradient(180deg, #C9F1FD 0%, #96DBF3 100%);">
	<img src="/assets/mainlogo.webp" alt="main-logo" class="w-1/2" />
</div>

<TimelineContainer timelineData={data.events} />

<Footer />
