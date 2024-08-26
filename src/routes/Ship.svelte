<img
	src="/assets/ship.webp"
	alt="ship"
	class="ship-rock z-[6] absolute min-w-[300px] w-1/4 max-w-[400px] 2xl:max-w-[600px] bottom-[110%]"
/>

<style>
	.ship-rock {
		animation: rock 5s infinite cubic-bezier(0.645, 0.045, 0.355, 1);
		transform-origin: bottom center;
	}

	@keyframes rock {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		25% {
			transform: translate(-5px, 5px) rotate(-3deg);
		}
		50% {
			transform: translate(0, 10px) rotate(0deg);
		}
		75% {
			transform: translate(5px, 5px) rotate(3deg);
		}
	}
</style>
