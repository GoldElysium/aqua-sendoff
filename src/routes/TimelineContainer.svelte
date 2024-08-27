<script lang="ts">
	import { onMount } from 'svelte';
	import getTempTimelineData from '$lib/js/getTempTimelineData';
	import type { YearlyTimelineData } from '$lib/types/types';
	import TimelineProgress from './TimelineProgressHorizontal.svelte';
	import Timeline from './Timeline.svelte';
	import * as m from '$lib/paraglide/messages';

	import Logo from './Logo.svelte';
	import { navbarOptions } from '$lib/navbar';
	import FrontPage from './FrontPage.svelte';

	export let timelineData: YearlyTimelineData[] = getTempTimelineData();

	let sectionRefs: HTMLDivElement[] = [];
	let timelineProgress: TimelineProgress; // Reference to the TimelineProgress component
	let lineHeight = 0;
	let container: HTMLDivElement | null = null;
	let layoutType: 'horizontal' | 'vertical' = 'horizontal';
	let target: HTMLDivElement | null = null;
	let footer: HTMLDivElement | null = null;
	let percDown = 0;

	let lastScrollTop = 0;
	let lastTimestamp = 0;
	let currentAngle = 0;

	// Function to calculate the reference points for each section
	// Function to handle scroll events
	const calculateAnchor = (middlePoint: number) => {
		if (container && target && footer) {
			const containerRect = container.getBoundingClientRect();
			const offset = 400 / window.devicePixelRatio;

			percDown = 1 - (containerRect.bottom + offset) / containerRect.height;

			const containerTop = containerRect.top * -1 + middlePoint + offset * percDown;
			lineHeight = Math.max(containerTop, 230);
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
		if (container?.offsetTop! - 256 <= window.scrollY) {
			navbarOptions.set({ colorScheme: 'light' });
		} else {
			navbarOptions.set({ colorScheme: 'dark' });
		}

		const currentTimestamp = Date.now();
		const middlePoint = window.innerHeight / 2;
		calculateAnchor(middlePoint);

		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const scrollSpeed =
			Math.abs(scrollTop - lastScrollTop) / (currentTimestamp - lastTimestamp);
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

	$: reachedEnd = percDown >= 0.95;

	onMount(() => {
		target = document.querySelector('#dive-deeper') as HTMLDivElement;
		footer = document.querySelector('#footer-home') as HTMLDivElement;

		updateLayout();
		onScroll();

		window.addEventListener('scroll', onScroll);
		window.addEventListener('resize', updateLayout);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', updateLayout);
		};
	});
</script>

<!-- Title page -->
<FrontPage>
	<span
		class="anchor-line {layoutType === 'vertical' &&
			'z-[0] ' + (reachedEnd ? 'opacity-1' : 'opacity-50')} transition-opacity"
		style="height: {lineHeight}px"
	>
		<a
			class="absolute bottom-0 translate-y-[88%] translate-x-[calc(-50%+1px)] grid place-items-center cursor-pointer"
			href={reachedEnd ? '/messages' : 'javascript:void(0)'}
		>
			{#if reachedEnd}
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
</FrontPage>
<!-- Timeline Content -->
<div
	id="timeline-section"
	bind:this={container}
	class="text-white py-16 relative"
	style="background: linear-gradient(180deg, #4B72D4 0%, #2B35A0 100%);"
>
	<!-- Anchor must be below this -->
	<div class="z-[10] relative">
		<div class="flex flex-col items-center p-5 gap-2 text-center">
			<h1 class="text-4xl font-bold z-10">{m.timelineHeader()}</h1>
			<h2 class="text-lg z-10">{m.timelineSubheader()}</h2>
		</div>

		<TimelineProgress bind:this={timelineProgress} {timelineData} />
		<Timeline {timelineData} {sectionRefs} {layoutType} />
	</div>
</div>

<style>
	.anchor-line {
		position: absolute;
		width: 4px;
		background: linear-gradient(180deg, rgba(46, 49, 145, 0.3) 0%, #2e3191 50%, #0f1134 100%);
		top: -110%;
		left: 50%;
		transform: translateX(-50%);
		transition: height 0.1s ease-out;
	}

	.sea {
		/* background: #4b72d4; */
		background: linear-gradient(180deg, rgba(75, 114, 212, 0.8) 0%, rgba(75, 114, 212, 1) 25%);
	}
</style>
