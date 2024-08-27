<script lang="ts">
	export let label: string;
	export let id: string;
</script>

<div class="md:px-4 px-2 py-2 rounded-md btn" on:click={() => document.getElementById(id)?.click()}>
	<input type="checkbox" checked {id} on:click|stopPropagation />
	<label for={id} class="md:text-[1rem] text-xs" on:click|stopPropagation>{label}</label>
</div>

<style lang="postcss">
	label {
		color: #2e3191;
	}
	.btn {
		background-color: #ffcd9b;
		border: 3px solid #ffd6ac;
	}
	input[type='checkbox'] {
		background-color: #2e3191;
		border-radius: 4px;
	}
</style>
