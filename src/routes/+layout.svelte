<script>
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';
	import { languageTag } from '$lib/paraglide/runtime';

	import '../app.css';
	import Header from './Header.svelte';

	const locale = languageTag();
</script>

<svelte:head>
	<meta property="og:title" content="Aqua iro Voyage" />
	<meta property="og:url" content="https://minatoaqua.ch" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://cdn.holoen.fans/hefw/media/aquairo_comp.jpg" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="theme-color" content="#B9DFF4" />

	{#if locale == 'ja'}
		<meta
			name="description"
			content="このプロジェクトは、私たちの大切なゲーマーメイドを新たな航海に送り出すために捧げられています。彼女は私たちとたくさんの思い出を作ってくれました。彼女は永遠に記憶に残るでしょう。卒業おめでとう、そして6年間の努力に感謝します！最後にもう一度さよならを！"
		/>
		<meta
			name="og:description"
			content="このプロジェクトは、私たちの大切なゲーマーメイドを新たな航海に送り出すために捧げられています。彼女は私たちとたくさんの思い出を作ってくれました。彼女は永遠に記憶に残るでしょう。卒業おめでとう、そして6年間の努力に感謝します！最後にもう一度さよならを！"
		/>
	{:else}
		<meta
			name="description"
			content="This project is dedicated to send off our precious gamer maid off onto her new voyage. She has made many memories with us and will forever be remembered. Congratulations on your graduation and thank you for your 6 years of hard work! One final goodbye! Otsuaqua!  いつかまたあおうましょう"
		/>
		<meta
			name="og:description"
			content="This project is dedicated to send off our precious gamer maid off onto her new voyage. She has made many memories with us and will forever be remembered. Congratulations on your graduation and thank you for your 6 years of hard work! One final goodbye! Otsuaqua!  いつかまたあおうましょう"
		/>
	{/if}
</svelte:head>

<ParaglideJS {i18n}>
	<Header />
	<slot />
</ParaglideJS>
