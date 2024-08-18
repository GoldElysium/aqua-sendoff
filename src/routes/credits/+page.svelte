<script lang="ts">
	import CreditList from './CreditList.svelte';
	import CreditFooter from './CreditFooter.svelte';
	import type { CreditGroup } from '$lib/types/types';
	import data from './DummyData.json';

    // Currently loading Dummy Data, change when actual data source for Credits exist
	let credits1: CreditGroup[] = data.creditList;
	let credits2: CreditGroup[] = data.creditList;
	let credits3: CreditGroup[] = data.creditList;

	let src = '/mainlogo.webp';
</script>

<div class="h-screen flex items-center justify-center" style="background-color:rgb(177, 231, 248)">
	<img {src} alt="main-logo" class="w-1/2" />
</div>

<div style="background: linear-gradient(#739aff, #4b72d4 10%, #2b35a0 70%);">
	<p class="text-center text-6xl text-white pt-32 py-16">Website</p>
	<CreditList credits={credits1}></CreditList>
	<p class="text-center text-6xl text-white py-16">Video</p>
	<CreditList credits={credits2}></CreditList>
	<p class="text-center text-6xl text-white py-16">Other</p>
	<CreditList credits={credits3}></CreditList>
</div>

<CreditFooter></CreditFooter>
