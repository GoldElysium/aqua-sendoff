<script lang="ts">
	import type { PageData } from './$types'
	import CreditList from './CreditList.svelte';
	import CreditFooter from './CreditFooter.svelte';

	let src = '/mainlogo.webp';

	export let data: PageData;
</script>

<div class="h-screen flex items-center justify-center" style="background-color:rgb(177, 231, 248)">
	<img {src} alt="main-logo" class="w-1/2" />
</div>

<div style="background: linear-gradient(#739aff, #4b72d4 10%, #2b35a0 70%);">
	<p class="text-center text-6xl text-white pt-32 py-16">Website</p>
	<CreditList credits={data.website}></CreditList>
	<p class="text-center text-6xl text-white py-16">Video</p>
	<CreditList credits={data.video}></CreditList>
	<p class="text-center text-6xl text-white py-16">Other</p>
	<CreditList credits={data.other}></CreditList>
</div>

<CreditFooter></CreditFooter>
