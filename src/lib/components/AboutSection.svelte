<script lang="ts">
	import { BIO, EMAIL, GITHUB_URL } from '$lib/constants';

	// TODO: Add Twitter/X after the account is registered.
	const medias = [
		{ name: 'Email', url: `mailto:${EMAIL}` },
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/ethkuil' },
		{ name: 'GitHub', url: GITHUB_URL },
		{
			name: '知乎',
			url: 'https://www.zhihu.com/people/epi3',
			description:
				'文字平台，内容最完整。各种文字类内容我都会发到知乎；其中值得长期保存的，会同步到个人网站。',
		},
		{ name: '小红书', url: 'https://www.xiaohongshu.com/user/profile/660ae0f9000000001700d924' },
		{ name: 'Bilibili', url: 'https://space.bilibili.com/472336190', description: '视频平台。' },
		{
			name: 'Bangumi',
			url: 'https://bangumi.tv/user/ethkuil',
			description: '用来记录和整理二次元作品的点格子工具。',
		},
		{ name: 'Last.fm', url: 'https://www.last.fm/user/Ethkuil', description: '记录最近听过的歌。' },
	];
</script>

<section class="mt-4 flex flex-col gap-4">
	<p>{BIO}</p>

	Find me on:
	<ul class="flex list-disc flex-col gap-1 pl-5">
		{#each medias as media}
			<li>
				<a
					href={media.url}
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-500 hover:underline"
				>
					{media.name}
				</a>
				{#if media.description}
					<span class="text-slate-600"> — {media.description}</span>
				{/if}
			</li>
		{/each}
	</ul>
</section>
