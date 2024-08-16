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
			}); // Adjust -100 for any header or offset
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
			<div class="year-landmark" style="left: {(index / (timelineData.length - 1)) * 100}%;">
				<div class="dot" on:click={() => scrollToYear(year)}></div>
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
		height: 10px;
		background-color: #e0e0e0;
		border-radius: 5px;
	}

	.progress-bar-fill {
		position: absolute;
		height: 100%;
		background-color: #007bff;
		border-radius: 5px;
		transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.year-landmark {
		position: absolute;
		top: -20px;
		transform: translateX(-50%);
		text-align: center;
	}

	.dot {
		width: 14px;
		height: 14px;
		background-color: #007bff;
		border-radius: 50%;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.dot:hover {
		background-color: #0056b3;
	}

	.year-label {
		margin-top: 20px;
		font-size: 12px;
		color: #333;
	}
</style>
