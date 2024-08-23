<script lang="ts">
	import type { PageData } from './$types';
	import Footer from './Footer.svelte';
	import TimelineContainer from './TimelineContainer.svelte';

	export let data: PageData;
	let seaRef: HTMLDivElement;
</script>

<div
	class="h-screen flex flex-col items-center bg-gray-100"
	style="background: linear-gradient(180deg, #C9F1FD 0%, #96DBF3 100%);"
>
	<img
		src="/assets/mainlogo.webp"
		alt="main-logo"
		class="absolute w-[40%] min-w-[300px] top-[40%] -translate-y-full"
	/>
	<img
		src="/assets/ship.webp"
		alt="ship"
		class="ship-rock z-[1] absolute min-w-[300px] w-[25%] md:bottom-[10%] bottom-[11%]"
	/>
	<div class="z-[5] min-h-[100px] h-[10%] absolute bottom-0" bind:this={seaRef}>
		<img src="assets/Water-wave.svg" alt="wave" />
		<div class="sea w-full h-full"></div>
	</div>
</div>

<TimelineContainer timelineData={data.events} />

<Footer />

<style>
	.ship-rock {
		animation: rock 5s infinite cubic-bezier(0.645, 0.045, 0.355, 1);
		transform-origin: bottom center;
	}

	@keyframes rock {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		25% {
			transform: translate(-5px, 5px) rotate(-3deg);
		}
		50% {
			transform: translate(0, 10px) rotate(0deg);
		}
		75% {
			transform: translate(5px, 5px) rotate(3deg);
		}
	}

	.sea {
		background: #4b72d4;
	}
</style>
