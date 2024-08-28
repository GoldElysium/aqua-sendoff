<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { scrollPos } from '$lib/scrollStore';
	import { onMount } from 'svelte';
	import AnchorScroll from '../messages/AnchorScroll.svelte';
	let footerRef: HTMLElement;

	const handleIntersect = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// When the footer is intersecting, update the scrollPos to 'tlFooter'
				scrollPos.set({
					section: 'crFooter'
				});
			} else {
				// If the footer is not intersecting, update the scrollPos to 'tl'
				scrollPos.set({
					section: 'cr'
				});
			}
		});
	};

	onMount(() => {
		const observer = new IntersectionObserver(handleIntersect, {
			threshold: 0.1 // Adjust threshold to trigger when 10% of the footer is visible
		});

		if (footerRef) {
			observer.observe(footerRef);
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<footer
	class="flex flex-col items-center justify-between text-foreground-blue-accent"
	style="background: linear-gradient(180deg, #ffc387 0%, #dba166 100%)"
	bind:this={footerRef}
>
	<p class="text-3xl font-bold flex flex-col grow items-center mt-24 text-center px-4">
		<img src="/assets/cat.svg" alt="cat" class="w-1/2 md:w-auto" />
		<span class="mt-12">{m.endText0()}</span>
		<span>{m.endText1()}</span>
	</p>
	<div class="text-center flex flex-col mt-48">
		<small class="text-xs md:text-sm text-opacity-70 mb-2">
			{m.footerAffiliation()}
		</small>
		<small class="text-xs md:text-sm mb-4">2024 @ AKUKIN建設 HQ</small>
	</div>
</footer>

{#if $scrollPos.section === 'cr'}
	<AnchorScroll targetElement={footerRef} section="crFooter" direction="bottom"></AnchorScroll>
{/if}
