<script lang="ts">
	import type { PageData } from './$types';
	import CreditList from './CreditList.svelte';
	import CreditFooter from './CreditFooter.svelte';
	import Title from '../messages/Title.svelte';
	import { navbarOptions } from '$lib/navbar';
	import { onMount } from 'svelte';
	import Ship from '../Ship.svelte';

	export let data: PageData;

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
	class="h-[100svh] md:h-screen flex items-center justify-center"
	style="background-color:rgb(177, 231, 248)"
>
	<img
		src="/assets/mainlogo.webp"
		alt="main-logo"
		class="absolute w-[40%] sm:w-[50%] lg:w-[40%] min-w-[350px] top-[35%] md:mt-8 -translate-y-full"
	/>
	<div class="z-[5] min-h-[100px] absolute bottom-0 w-full flex flex-col items-center">
		<Ship />
		<img
			src="/assets/Island.webp"
			alt="island"
			class="absolute z-[0] -bottom-4 md:right-[10%] -right-4 scale-75"
		/>
	</div>
	<img
		src="/assets/WaveTranslucent.svg"
		class="w-full z-[7] h-36 object-fit bottom-0 absolute"
		alt="wave"
	/>

	<img src="/assets/Wave.svg" class="w-full object-fit h-36 bottom-0 absolute" alt="wave" />
</div>

<div
	class="relative pb-40"
	style="background: linear-gradient(180deg, #4B72D4 0%, #2B35A0 100%);"
	bind:this={creditSection}
>
	<div
		class="absolute -top-32 inset-y-0 left-1/2 w-[0.25%] bg-gray-400 -z-0 opacity-70"
		style="background: linear-gradient(#2e3191, #1d1f5c40, #10113340, #0e0f2b);"
	></div>
	<div class="relative -z-0 md:w-[80%] m-auto">
		{#each data.credits.groups as group}
			<CreditList credits={group} social={data.credits.social}></CreditList>
		{/each}
	</div>
</div>

<Title />

<CreditFooter />
