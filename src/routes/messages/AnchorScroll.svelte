<script lang="ts">
	import { scrollPos, type ScrollPos } from '$lib/scrollStore';
	import { ArrowDownOutline, ArrowUpOutline } from 'flowbite-svelte-icons';

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
		'top-16'} flex items-center justify-center opacity-50 hover:opacity-100 right-4 z-[100] border rounded px-1 py-1 hover:bg-white text-foreground-blue-accent bg-white/75 transition-colors"
	on:click={handleScroll}
>
	{#if direction === 'top'}
		<ArrowUpOutline />
	{:else}
		<ArrowDownOutline />
	{/if}
</button>
