<script lang="ts">
	import classname from 'clsx';
	import { DOMAIN } from '$lib/constants';
	import type Page from '../types/page';
	let clazz: string | undefined = undefined;
	let pages: Page[];
	export { clazz as class, pages };
</script>

<nav class="z-10">
	<ul
		class={classname(
			'-ml-2 flex flex-row divide-x divide-dotted leading-4 child:px-1 child:first:pl-0 child:last:pr-0 [&_a]:py-4 [&_a]:px-2',
			clazz
		)}
	>
		<li>
			<a sveltekit:prefetch href="/">Home</a>
		</li>
		{#each pages || [] as { title, path } (title)}
			<li>
				<a sveltekit:prefetch href={`/${path || title?.toLowerCase()}`}>{title}</a>
			</li>
		{/each}
		{#if DOMAIN}
			<li>
				<a sveltekit:prefetch target="_blank" href="/atom.xml">Feed</a>
			</li>
		{/if}
	</ul>
</nav>
