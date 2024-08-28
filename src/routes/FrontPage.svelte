<script>
	import Ship from './Ship.svelte';
</script>

<!-- https://stackoverflow.com/questions/61308575/tailwind-h-screen-doesn-t-work-properly-on-mobile-devices -->
<div
	class="h-[100svh] md:h-screen flex flex-col items-center justify-end relative"
	style="background: linear-gradient(180deg, #C9F1FD 0%, #96DBF3 100%);"
>
	<img
		src="/assets/mainlogo.webp"
		alt="main-logo"
		class="absolute w-[40%] sm:w-[50%] lg:w-[40%] min-w-[350px] top-[35%] md:mt-8 -translate-y-full"
	/>
	<img src="/assets/Sun.webp" alt="sun" class="absolute left-0 top-0" />
	<div class="z-[5] min-h-[100px] relative w-full flex flex-col items-center">
		<Ship />

		<img
			src="/assets/Island.webp"
			alt="island"
			class="absolute z-[0] 2xl:bottom-0 -bottom-4 md:right-[10%] -right-4 scale-75 2xl:scale-100"
		/>

		<img
			src="/assets/WaveTranslucent.svg"
			class="w-full z-[7] h-36 object-fit bottom-0 absolute"
			alt="wave"
		/>
		<img src="/assets/Wave.svg" class="w-full object-fit h-36 bottom-0 absolute" alt="wave" />

		<slot></slot>
	</div>
</div>
