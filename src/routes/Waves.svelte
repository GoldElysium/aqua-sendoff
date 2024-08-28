<div class=" absolute h-36 w-full bottom-0 z-[7] overflow-hidden">
	<img
		src="/assets/WaveTranslucent.svg"
		class="scale-x-[250%] w-full h-full wave-animated"
		alt="wave"
	/>
</div>
<img src="/assets/Wave.svg" class="w-full object-fit h-36 bottom-0 absolute" alt="wave" />

<style>
	.wave-animated {
		animation: rock 5s infinite ease-in-out;
		transform-origin: bottom center;
	}

	/* Try to match the Ship rocking movement */
	@keyframes rock {
		0%,
		100% {
			transform: scaleX(250%) translate(0, 0);
		}
		25% {
			transform: scaleX(250%) translate(-100px, 10px);
		}
		50% {
			transform: scaleX(250%) translate(0, 5px);
		}
		75% {
			transform: scaleX(250%) translate(100px, 10px);
		}
	}
</style>
