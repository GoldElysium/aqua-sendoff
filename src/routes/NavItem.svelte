<script>
	export let href = '';
</script>

<a {href} on:click class="h-fit transition-colors">
	<span>
		<slot />
	</span>
</a>
