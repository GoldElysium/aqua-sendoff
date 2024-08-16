<script>
	export let href = '';
</script>

<a {href} on:click class="h-fit text-foreground-blue-accent">
	<span>
		<slot />
	</span>
</a>

<style>
</style>
