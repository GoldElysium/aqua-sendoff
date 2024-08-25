<script lang="ts">
	import type { PageData } from './$types';
	import CreditList from './CreditList.svelte';
	import CreditFooter from './CreditFooter.svelte';
	import Title from '../messages/Title.svelte';
	import { navbarOptions } from '$lib/navbar';
	import { onMount } from 'svelte';

	let src = '/assets/mainlogo.webp';

	export let data: PageData;

	let imgBoat = '/assets/Tamanegi on Boat.png';
	let imgWater = '/assets/Water-wave.svg';

	let creditSection: HTMLDivElement;

	navbarOptions.set({
		colorScheme: 'dark'
	});

	onMount(() => {
		const handler = () => {
			if (creditSection.offsetTop < window.scrollY) {
				navbarOptions.set({
					colorScheme: 'light'
				});
			} else {
				navbarOptions.set({
					colorScheme: 'dark'
				});
			}
		};

		window.addEventListener('scroll', handler);

		return () => {
			window.removeEventListener('scroll', handler);
		};
	});
</script>

<!-- https://stackoverflow.com/questions/61308575/tailwind-h-screen-doesn-t-work-properly-on-mobile-devices -->
<div
	class="h-[100svh] h-screen flex items-center justify-center"
	style="background-color:rgb(177, 231, 248)"
>
	<img {src} alt="main-logo" class="w-3/4 md:w-1/2" />
	<div class="absolute bottom-8 md:bottom-12 left-16 right-0 z-0 flex justify-center">
		<img src={imgBoat} alt="tamanegi on boat" class="w-1/2 md:w-auto" />
	</div>
	<div class="absolute bottom-16 -z-0 justify-center -mt-16">
		<img src={imgWater} alt="Water Wave" class="" />
	</div>
</div>

<div class="-z-20" bind:this={creditSection}>
	<div
		class="relative -mt-16"
		style="background: linear-gradient(#739aff, #4b72d4 10%, #2b35a0 70%);"
	>
		<div
			class="absolute -top-4 md:-top-8 inset-y-0 left-1/2 w-[0.25%] bg-gray-400 -z-0 opacity-70"
			style="background: linear-gradient(#2e3191, #1d1f5c40, #10113340, #0e0f2b);"
		></div>
		<div class="relative -z-0 w-[60%] m-auto">
			{#each data.credits as group}
				<CreditList credits={group}></CreditList>
			{/each}`
		</div>
	</div>
</div>

<Title />

<CreditFooter />
