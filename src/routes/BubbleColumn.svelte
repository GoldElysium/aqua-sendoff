<script lang="ts">
	export let bubbleCount: number = 20;
	export let loop: boolean = false;
	export let durationFixed: number = 2000;

	// Allows bubbles to start mid way up the page or even at the very top
	export let randomizeStart: boolean = false;

	$: bubbles = Array.from(new Array(bubbleCount)).map((_, idx) => {
		const size = Math.floor(Math.random() * 5) + 5; // 5 - 10rem
		return {
			leftOffset: (idx / bubbleCount) * 90 + Math.random() * 10,
			sizeRem: size,
			// Bubbles start is distributed across the duration
			delayMs: (randomizeStart ? -1 : 1) * Math.floor(Math.random() * durationFixed),
			// Speed is influenced by size, smaller moves faster = less duration
			durationMs: durationFixed + size * 50 // 3250 - 3700ms
		};
	});
</script>

{#each bubbles as bubble}
	<img
		src="/assets/bubble.svg"
		alt="bubble"
		class="w-16 h-auto bubble-animated opacity-0 absolute"
		style="
            left: {bubble.leftOffset}%;
            width: {bubble.sizeRem}rem;
            animation-delay: {bubble.delayMs}ms;
            animation-duration: {bubble.durationMs}ms;
            animation-iteration-count: {loop ? 'infinite' : 1};
        "
	/>
{/each}

<style>
	.bubble-animated {
		animation: bubbleUp 3s ease-in-out;
	}

	/* bubble from out of view to the top of the relative container */
	@keyframes bubbleUp {
		0% {
			bottom: -20%;
			opacity: 1;
		}
		60% {
			opacity: 1;
		}
		100% {
			bottom: 100%;
			opacity: 0;
		}
	}
</style>
