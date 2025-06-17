<script lang="ts">
	import { BIO, EMAIL, GITHUB_URL, REPOSITORY_URL } from '$lib/constants';

	let medias = {
		Email: `mailto:${EMAIL}`,
		Github: GITHUB_URL,
		Zhihu: 'https://www.zhihu.com/people/ethkuil',
		Bilibili: 'https://space.bilibili.com/472336190',
		Bangumi: 'https://bangumi.tv/user/ethkuil'
	};
</script>

<section class="mt-4 flex flex-col gap-4">
	<p>{BIO}</p>

	<div>
		目前这个博客框架不足之处很多，之后可能换个，目前暂且将就。数据存储于 <a
			href={`${REPOSITORY_URL}/discussions`}
			target="_blank"
			rel="noopener noreferrer"
			class="text-blue-500 hover:underline">GitHub Discussions</a
		>；某些本站目前欠缺的功能也可前往此处，比如「搜索」。
	</div>

	Find me on:
	<ul class="flex list-disc flex-col gap-1 pl-5">
		{#each Object.entries(medias) as [name, url]}
			<li>
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-500 hover:underline"
				>
					{name}
				</a>
			</li>
		{/each}
	</ul>
</section>
