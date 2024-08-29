<script lang="ts">
	import { getLazyObserver } from '$lib/lazy';
	import { onMount } from 'svelte';

	export let inline = true;
	export let visible = false;
	let spanRef: HTMLSpanElement | null = null;

	onMount(() => {
		const observer = getLazyObserver();

		if (spanRef) {
			const entry = observer.observe(spanRef);

			entry.onIntersect(() => {
				if (visible) return;
				visible = true;
			});

			return () => {
				entry.unobserve();
			};
		}
	});
</script>

<div class:inline bind:this={spanRef}>
	{#if visible}
		<slot />
	{/if}

	<noscript>
		<slot />
	</noscript>
</div>
