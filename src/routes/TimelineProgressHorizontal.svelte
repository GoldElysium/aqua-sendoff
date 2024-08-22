<script lang="ts">
	export let timelineData: { year: number }[];
	let progress = 0;

	// Function to scroll to a specific year's section
	const scrollToYear = (year: number) => {
		const element = document.getElementById(`year-heading-${year}`);
		if (element) {
			window.scrollTo({
				top: element.offsetTop + window.innerHeight - 50,
				behavior: 'smooth'
			});
		}
	};

	const step = 100 / (timelineData.length - 1);

	// Function to set progress based on the index and offset
	export function setProgress(index: number, offset: number) {
		progress = ((index + offset) / (timelineData.length - 1)) * 100;
	}
</script>

<div class="progress-bar-container md:mx-24 lg:mx-48">
	<div class="progress-bar">
		<div class="absolute inset-x-0 -top-1 z-10 flex justify-between drop-shadow-lg">
			{#each timelineData as { year }, index}
				<div
					class="year-landmark"
					style="left: calc({(index / (timelineData.length - 1)) * 100}% - 8px);"
				>
					<div
						class="dot {progress + 1 > step * index && 'active'}"
						on:click={() => scrollToYear(year)}
					></div>
					<div class="year-label">{year}</div>
				</div>
			{/each}
		</div>
		<div class="progress-bar-fill" style="width: {progress}%; min-width: 8px;"></div>
	</div>
</div>

<style>
	.progress-bar-container {
		position: sticky;
		top: 4.5rem;
		z-index: 10;
		display: flex;
		justify-content: center;
		padding: 1rem 0;
	}

	.progress-bar {
		position: relative;
		width: 80%;
		height: 6px;
		background-color: #f9c4ce;
		border-radius: 3px;
		/* padding: 0 8px; */
	}

	.progress-bar-fill {
		position: absolute;
		height: 100%;
		background-color: #b9dff4;
		border-radius: 3px;
		transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.year-landmark {
		display: grid;
		place-items: center;
		text-align: center;
	}

	.dot {
		width: 16px;
		height: 16px;
		background-color: #f9c4ce;
		border-radius: 50%;
		cursor: pointer;
		transition:
			background-color 0.3s,
			transform 0.3s;
	}

	.dot.active {
		background-color: #b9dff4;
	}

	.dot:hover {
		background-color: #f8b8c4;
		transform: scale(1.1);
	}

	.dot.active:hover {
		background-color: #a9cef4;
	}

	.year-label {
		margin-top: 10px;
		font-size: 12px;
		color: white;
		font-weight: medium;
	}
</style>
