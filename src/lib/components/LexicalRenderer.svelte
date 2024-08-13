<!-- Adapted from https://old.reddit.com/r/PayloadCMS/comments/179crdw/lexical_to_sveltehtml/ -->

<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */

	// Text node formatting
	export const IS_BOLD = 1;
	export const IS_ITALIC = 1 << 1;
	export const IS_STRIKETHROUGH = 1 << 2;
	export const IS_UNDERLINE = 1 << 3;
	export const IS_CODE = 1 << 4;
	export const IS_SUBSCRIPT = 1 << 5;
	export const IS_SUPERSCRIPT = 1 << 6;

	// eslint-disable-next-line
	export let nodes: any[] = [];
</script>

{#each nodes as node}
	{#if node.type === 'text'}
		{#if node.format & IS_BOLD}
			<strong class="text bold">{@html node.text}</strong>
		{:else if node.format & IS_ITALIC}
			<em class="text italic">{@html node.text}</em>
		{:else if node.format & IS_CODE}
			<code>{@html node.text}</code>
		{:else if node.format & IS_SUBSCRIPT}
			<sub>{@html node.text}</sub>
		{:else if node.format & IS_SUPERSCRIPT}
			<sup>{@html node.text}</sup>
		{:else}
			<span
				class="text"
				class:underline={node.format & IS_UNDERLINE}
				class:strikethrough={node.format & IS_STRIKETHROUGH}
			>{@html node.text}</span>
		{/if}
	{:else if node.type === 'linebreak'}
		<br />
	{:else if node.type === 'paragraph'}
		<p>
			<svelte:self nodes={node.children} />
		</p>
	{:else if node.type === 'listitem'}
		<li data-checked={node.checked}>
			<svelte:self nodes={node.children} />
		</li>
	{:else if node.type === 'list'}
		{#if node.tag && node.listType === 'number'}
			<ol class="list-decimal list-inside ">
				<svelte:self nodes={node.children} />
			</ol>
		{:else if node.tag && node.listType === 'bullet'}
			<ul class="list-disc list-inside">
				<svelte:self nodes={node.children} />
			</ul>
		{:else}
			<ul data-checklist>
				<svelte:self nodes={node.children} />
			</ul>
		{/if}
	{:else if node.type === 'quote'}
		<blockquote>
			<svelte:self nodes={node.children} />
		</blockquote>
	{:else if node.type === 'link'}
		{#if node.fields.linkType === 'custom'}
			<a href={node.fields.url} target={node.fields.newTab ? '_blank' : '_self'}>
				<svelte:self nodes={node.children} />
			</a>
		{/if}
	{/if}
{/each}

<style>
	a {
		font-weight: bold;
		outline: none;
		text-decoration: underline 0.15em rgba(0, 0, 0, 0);
		transition: text-decoration-color 300ms;
	}

	/* Always show links in non-hover devices */
	@media (hover: none) {
		a:link {
			text-decoration-color: rgb(255, 182, 209);
		}
	}

	a:link {
		color: rgb(255, 182, 209);
	}

	a:visited {
		color: #e60073;
	}

	a:focus {
		text-decoration-color: rgb(255, 182, 209);
	}

	a:hover {
		text-decoration-color: rgb(255, 182, 209);
	}

	a:active {
		text-decoration: none;
	}

	.bold {
		font-weight: bold;
	}

	.italic {
		font-style: italic;
	}

	.underline.strikethrough {
		text-decoration: line-through underline;
	}

	.underline {
		text-decoration: underline;
	}

	.strikethrough {
		text-decoration: line-through;
	}

	blockquote {
		border-left: 0.2rem solid gray;
		padding-left: 0.4rem;
	}

	.text {
		white-space: pre-line;
	}
</style>
