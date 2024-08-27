<script lang="ts">
	import PastProjectCard from './PastProjectCard.svelte';
</script>

<section class="group flex flex-col items-center">
	<!-- Submissions -->
	<div class="grid place-items-center py-8 w-10/12">
		<div class="grid max-w-[96rem] md:grid-cols-3 gap-12">
			<PastProjectCard
				projectName="Aqua 2nd Birthday Website"
				url="https://hololive.hololivepro.com/talents/minato-aqua/"
			/>
			<PastProjectCard
				projectName="Aqua 2nd Birthday Website"
				url="https://hololive.hololivepro.com/talents/minato-aqua/"
				color="blue"
			/>
			<PastProjectCard
				projectName="Aqua 2nd Birthday Website"
				url="https://hololive.hololivepro.com/talents/minato-aqua/"
				color="yellow"
			/>
		</div>
	</div>
</section>
