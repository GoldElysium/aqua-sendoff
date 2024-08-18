<script lang="ts">
	import { onMount } from 'svelte';
	import getTempTimelineData from '$lib/js/getTempTimelineData';
	import type { YearlyTimelineData } from '$lib/types/types';
	import TimelineProgress from './TimelineProgressHorizontal.svelte';
	import TimelineHorizontal from './TimelineHorizontal.svelte';
	import TimelineVertical from './TimelineVertical.svelte';
	import TimelineProgressVertical from './TimelineProgressVertical.svelte';
	import Logo from './Logo.svelte';

	export let timelineData: YearlyTimelineData[] = getTempTimelineData();

	const anchorOffset = {
		horizontal: 150,
		vertical: 100
	};

	let sectionRefs: HTMLDivElement[] = [];
	let timelineProgress: TimelineProgress; // Reference to the TimelineProgress component
	let lineHeight = 0;
	let container: HTMLDivElement | null = null;
	let layoutType: 'horizontal' | 'vertical' = 'horizontal';
	let target: HTMLDivElement | null = null;
	let percDown = 0;

	let lastScrollTop = 0;
	let lastTimestamp = 0;
	let currentAngle = 0;

	// Function to calculate the reference points for each section
	// Function to handle scroll events
	const calculateAnchor = (middlePoint: number) => {
		if (container && target) {
			const containerRect = container.getBoundingClientRect();
			percDown = 1 - containerRect.bottom / containerRect.height;
			const containerTop =
				containerRect.top * -1 + middlePoint + anchorOffset[layoutType] * percDown;

			lineHeight = containerTop < 0 ? 0 : containerTop;
		}
	};

	function animateSwing() {
		currentAngle *= 0.999; // Decay factor to reduce the angle over time

		if (Math.abs(currentAngle) < 0.1) {
			currentAngle = 0;
		} else {
			requestAnimationFrame(animateSwing);
		}
	}

	const onScroll = () => {
		const currentTimestamp = Date.now();

		const middlePoint = window.innerHeight / 2;

		calculateAnchor(middlePoint);

		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    	const scrollSpeed = Math.abs(scrollTop - lastScrollTop) / (currentTimestamp - lastTimestamp);
		currentAngle += scrollSpeed * 0.5 * (Math.random() > 0.5 ? 1 : -1);
		animateSwing();

		let closestIndex = 0;
		let minDiff = Infinity;

		// Find the closest reference point
		sectionRefs.forEach((section, index) => {
			const point = section.getBoundingClientRect().y;
			const diff = Math.abs(middlePoint - point);
			if (diff < minDiff && point < middlePoint) {
				minDiff = diff;
				closestIndex = index;
			}
		});

		if (minDiff === Infinity) {
			return;
		}

		// Offset from the current scollPos to the reference point
		const offset =
			closestIndex < sectionRefs.length - 1
				? minDiff / sectionRefs[closestIndex].clientHeight
				: 0;
		// Update the progress component
		if (timelineProgress) {
			timelineProgress.setProgress(closestIndex, offset);
		}

		lastScrollTop = scrollTop;
    	lastTimestamp = currentTimestamp;
	};

	const updateLayout = () => {
		layoutType = window.innerWidth >= 768 ? 'horizontal' : 'vertical';
	};

	onMount(() => {
		updateLayout();
		target = document.getElementById('dive-deeper') as HTMLDivElement;

		window.addEventListener('scroll', onScroll);
		window.addEventListener('resize', updateLayout);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', updateLayout);
		};
	});
</script>

<!-- Progress Bar -->

<!-- Timeline Content -->
<div
	id="timeline-section"
	bind:this={container}
	class="text-white py-16 relative"
	style="background: linear-gradient(180deg, #4B72D4 0%, #2B35A0 100%);"
>
	<span class="anchor-line" style="height: {lineHeight}px">
		<a
			class="absolute bottom-0 translate-y-[88%] translate-x-[calc(-50%+1px)] grid place-items-center cursor-pointer"
			href="{percDown >= 0.92 ? '/messages' : 'javascript:void(0)'}"
		>
			{#if percDown >= 0.92}
				<span class="w-20 h-20 bg-white opacity-20 animate-ping absolute rounded-full"
				></span>
			{/if}
			<Logo
				size={60}
				style="transform: rotate({currentAngle}deg)"
				class="fill-foreground-blue rotate-0 z-[5] origin-top transition-opacity {lineHeight ==
				0
					? 'opacity-0'
					: 'opacity-100'}"
			/>
		</a>
	</span>

	<div class="z-10">
		<div class="flex flex-col items-center justify-center p-5 gap-2">
			<h1 class="text-4xl font-bold z-10">It's been a long journey</h1>
			<h2 class="text-lg z-10">7 years of voyage</h2>
		</div>
		{#if layoutType === 'horizontal'}
			<TimelineProgress bind:this={timelineProgress} {timelineData} />
			<TimelineHorizontal {timelineData} {sectionRefs} />
		{/if}

		{#if layoutType === 'vertical'}
			<div class="flex">
				<TimelineProgressVertical bind:this={timelineProgress} {timelineData} />
				<TimelineVertical {timelineData} {sectionRefs} />
			</div>
		{/if}
	</div>
</div>

<style>
	.anchor-line {
		position: absolute;
		width: 4px;
		background: linear-gradient(180deg, #2e319152 32%, #2e3191 50%, #0f1134 100%);
		top: 0;
		left: 50%;
		z-index: 1;
		transform: translateX(-50%);
		transition: height 0.1s ease-out;
	}
</style>
