<svelte:head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown.min.css">
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
