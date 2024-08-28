<script lang="ts">
	import * as m from '$lib/paraglide/messages';
</script>

<footer class="flex flex-col items-center justify-between text-foreground-blue-accent">
	<p class="text-3xl font-bold flex flex-col grow items-center mt-24 text-center px-4">
		<img src="/assets/cat.svg" alt="cat" class="w-1/2 md:w-auto" />
		<span class="mt-12">{m.endText0()}</span>
		<span>{m.endText1()}</span>
	</p>
	<a class="text-2xl mt-12 underline" href="/credits">{m.creditsLink()}</a>
	<div class="text-center flex flex-col mt-24">
		<small class="text-xs md:text-sm text-opacity-70 mb-2">
			{m.footerAffiliation()}
		</small>
		<small class="text-xs md:text-sm mb-4">2024 @ AKUKIN HQ</small>
	</div>
</footer>
