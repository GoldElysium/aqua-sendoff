<script lang="ts">
	import { getLazyObserver } from '$lib/lazy';
	import { onMount } from 'svelte';

	export let visible = false;
	export let src: string;

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

<img bind:this={spanRef} alt="" {...$$props} src={visible ? src : ''} />
