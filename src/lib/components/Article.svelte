<svelte:head>
<!-- https://github.com/sindresorhus/github-markdown-css -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-light.min.css">
<style>
	.markdown-body ul, ol {
		all: revert;
	}
</style>
<!-- https://katex.org/docs/browser.html -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css" integrity="sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP" crossorigin="anonymous">
</svelte:head>

<script lang="ts">
	export let lang: string | undefined = undefined;
</script>

<article
	class="markdown-body bg-slate-50! prose-h1:text-2xl!"
	{lang}
>
	<slot />
</article>
