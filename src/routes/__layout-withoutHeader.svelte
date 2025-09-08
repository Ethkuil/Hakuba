<script context="module" lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import { BLOG_NAME, DESCRIPTION, KEYWORDS, TWITTER } from '$lib/constants';
	import type { Load } from '@sveltejs/kit';
	import { fetchPagesMeta } from '$lib/helper/fetchPage';
	import type Page from '$lib/types/page';

	export const load: Load = async ({ params }) => {
		const pages = await fetchPagesMeta();
		return {
			props: {
				pages: pages.map(({ metadata }) => metadata)
			}
		};
	};
</script>

<script lang="ts">
	export let pages: Page[];
</script>

<svelte:head>
	<title>{BLOG_NAME}</title>
	<meta property="og:title" content={BLOG_NAME} />
	<meta name="description" content={DESCRIPTION} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta name="keywords" content={KEYWORDS} />

	<meta property="og:site_name" content={BLOG_NAME} />
	<meta property="generator" content="Hakuba" />
	<meta property="twitter:card" content="summary" />
	{#if TWITTER}
		<meta name="twitter:site" content={`@${TWITTER}`} />
		<meta name="twitter:creator" content={`@${TWITTER}`} />
	{/if}
</svelte:head>

<main class="flex grow flex-col">
	<slot />
</main>

<Footer {pages} />
