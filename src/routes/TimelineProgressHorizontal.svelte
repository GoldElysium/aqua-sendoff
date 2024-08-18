<script lang="ts">
	export let timelineData: { year: number }[];
	let progress = 0;

	// Function to scroll to a specific year's section
	const scrollToYear = (year: number) => {
		const element = document.getElementById(`year-${year}`);
		if (element) {
			window.scrollTo({
				top: element.offsetTop - window.innerHeight / 2,
				behavior: 'smooth'
			});
		}
	};

	// Function to set progress based on the index and offset
	export function setProgress(index: number, offset: number) {
		progress = ((index + offset) / (timelineData.length - 1)) * 100;
	}
</script>

<div class="progress-bar-container">
	<div class="progress-bar">
		<div class="progress-bar-fill" style="width: {progress}%;"></div>
		{#each timelineData as { year }, index}
			<div
				class="year-landmark"
				style="left: calc({(index / (timelineData.length - 1)) * 100}% - 8px);"
			>
				<button class="dot" on:click={() => scrollToYear(year)}></button>
				<div class="year-label">{year}</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.progress-bar-container {
		position: sticky;
		top: 30px;
		z-index: 10;
		display: flex;
		justify-content: center;
		margin-top: 1rem;
	}

	.progress-bar {
		position: relative;
		width: 80%;
		height: 6px;
		background-color: #e0e0e0;
		border-radius: 3px;
		padding: 0 8px;
	}

	.progress-bar-fill {
		position: absolute;
		height: 100%;
		background-color: #007bff;
		border-radius: 3px;
		transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.year-landmark {
		position: absolute;

		text-align: center;
	}

	.dot {
		width: 16px;
		height: 16px;
		background-color: #007bff;
		border: 2px solid #ffffff;
		border-radius: 50%;
		cursor: pointer;
		transition:
			background-color 0.3s,
			transform 0.3s;
	}

	.dot:hover {
		background-color: #0056b3;
		transform: scale(1.1);
	}

	.year-label {
		margin-top: 10px;
		font-size: 12px;
		color: #333;
		font-weight: bold;
	}
</style>
