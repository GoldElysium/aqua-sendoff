<script lang="ts">
	import { languageTag } from '$lib/paraglide/runtime';
	import type { ArtSubmissionData } from '$lib/types/types';
	import iso3166 from 'iso-3166-1';

	export let data: ArtSubmissionData;

	export let color: 'pink' | 'blue' | 'yellow' = 'pink';

	// Function to generate a random rotation angle between -3 and 3 degrees
	function getRandomRotation(maxRotation: number = 2): number {
		return Math.floor(Math.random() * (maxRotation * 2 + 1)) - maxRotation;
	}

	function hasSubType(data: ArtSubmissionData, type: string): boolean {
		return data.images.some((image) => image.subtype === type);
	}

	function hasType(data: ArtSubmissionData, type: string): boolean {
		return data.images.some((image) => image.type === type);
	}

	function getFlag(country: string | null | undefined): string {
		if (!country) return '';
		// return directly cause not official name (kinda dumb i know)
		if (country === 'Vietnam') return 'https://flagsapi.com/VN/flat/64.png';
		if (country === 'South-Africa') return 'https://flagsapi.com/ZA/flat/64.png';
		if (country === 'United-States') return 'https://flagsapi.com/US/flat/64.png';
		if (country === 'South-Korea') return 'https://flagsapi.com/KR/flat/64.png';
		if (country === 'Brunei') return 'https://flagsapi.com/BN/flat/64.png';
		if (country === 'United-Kingdom') return 'https://flagsapi.com/GB/flat/64.png';
		if (country === 'El-Salvador') return 'https://flagsapi.com/SV/flat/64.png';
		if (country === 'Taiwan') return 'https://flagsapi.com/TW/flat/64.png';
		if (country === 'Russia') return 'https://flagsapi.com/RU/flat/64.png';
		if (country === 'New-Zealand') return 'https://flagsapi.com/NZ/flat/64.png';

		const iso = iso3166.whereCountry(country)?.alpha2;
		return `https://flagsapi.com/${iso}/flat/64.png`;
	}

	let rotationAngle = getRandomRotation();
</script>

<div
	class="p-4 break-inside-avoid rounded-md h-fit hidden min-w-0 mb-8 {color} {$$props.class}"
	class:message={data.message && data.images.length === 0}
	class:artwork={hasType(data, 'image') && hasSubType(data, 'artwork')}
	class:photo={hasType(data, 'image') && hasSubType(data, 'picture')}
	class:video={hasType(data, 'video')}
	style="transform: rotate({rotationAngle}deg);"
	id="card"
>
	<div class="flex justify-between mb-6">
		<div class="flex gap-2 items-center">
			<h1 class="text-2xl">{data.author}</h1>
			{#if data.authorIcon}
				<img src={data.authorIcon?.src} alt={data.author} class="w-8 h-8 rounded-full" />
			{/if}
		</div>
		{#if data.country}
			<img src={getFlag(data.country)} alt={data.country} class="w-8 h-8" />
		{/if}
	</div>
	<p>{data.message[languageTag()] ? data.message[languageTag()] : data.message['en']}</p>
	{#if languageTag() !== 'ja' && data.message['ja']}
		<div class="border-t-2 border-black opacity-10 my-4"></div>
		<p>{data.message['ja']}</p>
	{/if}
	<div class="grid place-items-center">
		{#each data.images as image}
			<div style="aspect-ratio: {image.width / image.height}" class="w-11/12 h-auto">
				{#if image.type === 'image'}
					<img
						src={image.src}
						alt={image.alt}
						decoding="async"
						loading="lazy"
						class="img-sub"
					/>
				{:else if image.type === 'video'}
					<iframe title={image.alt} src={image.src} class="w-full aspect-video" />
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	h1,
	p {
		color: #2e3191;
	}
	#card {
		background-color: #ffecd9;
		border: 5px solid;
	}
	#card.pink {
		border-color: #e284af;
	}
	#card.blue {
		border-color: #2e3191;
	}
	#card.yellow {
		border-color: #f7bf52;
	}
	.img-sub {
		border-radius: 4px;
		border: 3px solid white;
	}
</style>
