<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { fetchPage } from '$lib/helper/fetchPage';
	import type Page from '$lib/types/page';
	import Giscus from '$lib/components/Giscus.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
    import Article from '$lib/components/Article.svelte';

	export const load: Load = async ({ params: { page } }) => {
		const p = await fetchPage(page);
		if (!p) return { status: 404 };

		return {
			props: {
				...p
			}
		};
	};
</script>

<script lang="ts">
	export let html: string;
	export let metadata: Page;
</script>

<PageMeta {metadata} />

<Article lang={metadata.lang}>
	{@html html}
</Article>

<Giscus config={metadata} />
