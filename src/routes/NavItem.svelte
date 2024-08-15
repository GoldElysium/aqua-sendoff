<script>
	export let href = '';
</script>

<a {href} on:click>
	<span>
		<slot />
	</span>
</a>

<style>
	a {
		color: #2e3191;
	}
</style>
