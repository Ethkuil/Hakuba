<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { SvelteComponent } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import type Post from '$lib/types/post';
	import Article from '$lib/components/Article.svelte';
	import Labels from '$lib/components/Labels.svelte';
	import { readableDate } from '$lib/helper/readableDate';
	import { fetchPost } from '$lib/helper/fetchPosts';
	import BackButton from '$lib/components/BackButton.svelte';
	import Giscus from '$lib/components/Giscus.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';

	export const load: Load = async ({ params }) => {
		try {
			const post = await fetchPost(params.post);
			if (!post) {
				throw new Error('Post not found');
			}

			const metadata = post.metadata;

			// allow UTF-8 characters in the slug
			const expectedSlug = metadata.title.trim().replace(/\s+/g, '-').slice(0, 50).toLowerCase();
			// slug may contain slashes, where we only take the first part
			const currentSlug = decodeURIComponent(params.slug.split('/')[0]);
			if (currentSlug !== expectedSlug) {
				return {
					status: 308,
					redirect: `/post/${params.post}/${encodeURIComponent(expectedSlug)}`
				};
			}

			return {
				props: {
					...post,
					labels: metadata.labels?.map(({ name }) => name),
					published: readableDate(metadata.published, metadata.timezone),
					updated: metadata.updated ? readableDate(metadata.updated, metadata.timezone) : undefined
				}
			};
		} catch {
			return { status: 404 };
		}
	};
</script>

<script lang="ts">
	export let component: SvelteComponent;
	export let metadata: Post;
	export let labels: string[] | undefined;
	export let published: string | undefined;
	export let updated: string | undefined;
</script>

<PageMeta {metadata} />

<Article lang={metadata.lang}>
	<header class="mb-14 flex flex-col">
		<Header class="group relative">
			<BackButton />
			{metadata.title}
		</Header>
		<div
			class="flex flex-col justify-center **:text-sm! **:font-normal! **:text-slate-600! "
		>
			<div class=" mt-4 self-start border-t border-t-slate-900 pt-2">
				Published: {published}
			</div>
			{#if updated && updated !== published}
				<div>
					Updated: &nbsp;&nbsp;{updated}
				</div>
			{/if}
			<Labels {labels} />
		</div>
	</header>

	<svelte:component this={component} />

	<Giscus config={metadata} />
</Article>
