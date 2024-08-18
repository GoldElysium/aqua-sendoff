<script lang="ts">
	import type { PageData } from './$types';
	import CreditList from './CreditList.svelte';
	import CreditFooter from './CreditFooter.svelte';

	let src = '/assets/mainlogo.webp';

	export let data: PageData;
	let imgBoat = '/assets/Tamanegi on Boat.png';
    let imgWater = '/assets/Water-wave.svg';
</script>

<div class="h-screen flex items-center justify-center" style="background-color:rgb(177, 231, 248)">
	<img {src} alt="main-logo" class="w-3/4 md:w-1/2" />
	<div class="absolute bottom-8 md:bottom-12 left-16 right-0 z-20 flex justify-center">
		<img src={imgBoat} alt="tamanegi on boat" class="w-1/2 md:w-auto" />
	</div>
	<div class="absolute bottom-16 left-0 right-0 z-0 justify-center -mt-16">
		<img src={imgWater} alt="Water Wave" class="w-1/2 md:w-full" />
	</div>
</div>

<div
	class="relative -mt-16"
	style="background: linear-gradient(#739aff, #4b72d4 10%, #2b35a0 70%);"
>
	<div
		class="absolute -top-4 md:-top-8 inset-y-0 left-1/2 w-1 bg-gray-400 z-0"
		style="background: linear-gradient(#2e3191, #1d1f5c40, #10113340, #0e0f2b);"
	></div>
	<div class="relative z-20">
		<p class="text-center text-6xl text-white pt-32 py-16">Website</p>
		<CreditList credits={data.website}></CreditList>
		<p class="text-center text-6xl text-white py-16">Video</p>
		<CreditList credits={data.video}></CreditList>
		<p class="text-center text-6xl text-white py-16">Other</p>
		<CreditList credits={data.other}></CreditList>
	</div>
</div>

<div style="height: 75vh;">
	<CreditFooter></CreditFooter>
</div>
