<script lang="ts">
	import { scrollPos, type ScrollPos } from '$lib/scrollStore';
	import { onMount } from 'svelte';
	import AnchorScroll from './messages/AnchorScroll.svelte';
	import Ship from './Ship.svelte';
	import Waves from './Waves.svelte';

	let homeRef: HTMLDivElement;
	export let targetElement: HTMLElement | HTMLDivElement;

	// Intersection observer callback
	const handleIntersect = (entries: IntersectionObserverEntry[]) => {
		let $curSection = $scrollPos.section;
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// If the target element is intersecting the viewport
				if ($curSection === 'tl') {
					scrollPos.set({
						section: 'tlHome'
					});
				} else {
					scrollPos.set({
						section: 'crHome'
					});
				}
			} else {
				// If the target element is not intersecting
				const curSection = $scrollPos.section;
				if (curSection === 'tlHome') {
					scrollPos.set({
						section: 'tl'
					});
				} else if (curSection === 'crHome') {
					scrollPos.set({
						section: 'cr'
					});
				}
			}
		});
	};

	onMount(() => {
		const observer = new IntersectionObserver(handleIntersect, {
			threshold: 0.9 // Adjust the threshold to determine when the intersection occurs
		});

		if (homeRef) {
			observer.observe(homeRef);
		}
		if (targetElement) {
			observer.observe(targetElement);
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<!-- https://stackoverflow.com/questions/61308575/tailwind-h-screen-doesn-t-work-properly-on-mobile-devices -->
<div
	class="h-[100svh] md:h-screen flex flex-col items-center justify-end relative"
	style="background: linear-gradient(180deg, #C9F1FD 0%, #96DBF3 100%);"
	bind:this={homeRef}
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
		<Waves />
		<slot></slot>
	</div>
</div>

{#if $scrollPos.section === 'tlHome'}
	<AnchorScroll {targetElement} section="tl" direction="bottom"></AnchorScroll>
{/if}

{#if $scrollPos.section === 'crHome'}
	<AnchorScroll {targetElement} section="cr" direction="bottom"></AnchorScroll>
{/if}
