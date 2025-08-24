<script lang="ts">
	import { BIO, EMAIL, GITHUB_URL } from '$lib/constants';

	let medias = {
		'Email': `mailto:${EMAIL}`,
		'Github': GITHUB_URL,
		'Bilibili': 'https://space.bilibili.com/472336190',
		'Bangumi': 'https://bangumi.tv/user/ethkuil',
		'Last.fm': 'https://www.last.fm/user/Ethkuil',
	};
</script>

<section class="mt-4 flex flex-col gap-4">
	<p>{BIO}</p>

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
