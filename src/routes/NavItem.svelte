<script>
	export let href = '';
</script>

<a {href} on:click class="h-fit">
	<span>
		<slot />
	</span>
</a>
