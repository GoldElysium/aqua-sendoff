<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { scrollPos, type ScrollPos } from '$lib/scrollStore';
	import { onMount } from 'svelte';
	import AnchorScroll from './messages/AnchorScroll.svelte';
	let footerRef: HTMLElement;

	// Intersection observer callback
	const handleIntersect = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// When the footer is intersecting, update the scrollPos to 'tlFooter'
				scrollPos.set({
					section: 'tlFooter'
				});
			} else {
				// If the footer is not intersecting, update the scrollPos to 'tl'
				scrollPos.set({
					section: 'tl'
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
	class="flex flex-col items-center pb-4 text-foreground-blue-dim"
	id="footer-home"
	style="background: linear-gradient(180deg, #2B35A0 0%, #2F1A8A 100%);"
	bind:this={footerRef}
>
	<p
		class="text-4xl uppercase flex flex-col items-center py-24 pt-36 lg:pt-44 text-white"
		id="dive-deeper"
	>
		{#each m.timelineFooter().split(' ') as word}
			<span class="text-5xl">{word}</span>
		{/each}
	</p>

	<small class="text-sm mb-2 text-center">{m.footerAffiliation()}</small>
	<small>2024 @ AKUKIN建設 HQ</small>
</footer>

{#if $scrollPos.section === 'tl'}
	<AnchorScroll targetElement={footerRef} section="tlFooter" direction="bottom"></AnchorScroll>
{/if}
