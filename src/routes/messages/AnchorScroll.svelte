<script lang="ts">
	import { scrollPos, type ScrollPos } from '$lib/scrollStore';

	export let targetElement: HTMLElement;
	export let section: ScrollPos;
	export let direction: 'top' | 'bottom' = 'bottom';
	const handleScroll = () => {
		targetElement.scrollIntoView({ behavior: 'smooth' });
		scrollPos.set({ section });
	};
</script>

<!-- The thing that when you click it scrolls to bottom or top of page -->
<button
	class="fixed {direction === 'bottom' && 'bottom-4'} {direction === 'top' &&
		'top-20'} right-8 z-[100] text-white"
	on:click={handleScroll}
>
	go to {section}
</button>
