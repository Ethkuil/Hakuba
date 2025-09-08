import type Post from '$lib/types/post';

export interface PostModule {
	metadata: Post;
	html: string;
}

export interface FetchPostsOptions {
	offset?: number;
	limit?: number;
	label?: string;
}

async function _fetchPosts<T extends boolean>(options: FetchPostsOptions = {}, metadataOnly: T) {
	const { offset, limit, label } = options;
	let allPosts = (
		await Promise.all(
			Object.entries(import.meta.glob('../../routes/post/_source/*.js')).map(
				async ([, loader]) => {
					const module = (await loader()) as PostModule;
					// return metadataOnly ? { metadata: module.metadata } : module;
					return metadataOnly ? { metadata: module.metadata } : module;
				}
			)
		)
	) as (T extends true ? { metadata: Post } : PostModule)[];

	// sort by published date desc
	allPosts = allPosts.sort(
		(a, b) => new Date(b.metadata.published).getTime() - new Date(a.metadata.published).getTime()
	);

	// filter
	if (label) {
		allPosts = allPosts.filter((post) =>
			post.metadata.labels?.some(({ name }) => name === label)
		);
	}

	const count = allPosts.length;

	// apply pagination
	if (offset || limit) {
		const start = offset ?? 0;
		const end = limit ? start + limit : undefined;
		allPosts = allPosts.slice(start, end);
	}

	return {
		list: allPosts,
		count: count
	};
};

export const fetchPosts = async ({ offset, limit, label }: FetchPostsOptions = {}) => {
	return _fetchPosts({ offset, limit, label }, false);
}

export const fetchPostsMeta = async ({ offset, limit, label }: FetchPostsOptions = {}) => {
	return _fetchPosts({ offset, limit, label }, true);
}

export const fetchLabels = async () => {
	const { list } = await fetchPostsMeta();
	const labelCounts = new Map<string, number>();

	for (const post of list) {
		const labels = post.metadata.labels;
		if (labels) {
			for (const { name } of labels) {
				labelCounts.set(name, (labelCounts.get(name) ?? 0) + 1);
			}
		}
	}

	return Array.from(labelCounts.entries()).sort((a, b) => b[1] - a[1]);
};

// path is number ID or custom path
export const fetchPost = async (path: string) => {
	if (/^\d+$/.test(path)) {
		// number ID
		try {
			const module = await import(`../../routes/post/_source/${path}.js`) as PostModule;
			return module;
		} catch {
			return undefined;
		}
	}

	// custom path
	const { list } = await fetchPostsMeta();
	const post = list.find(({ metadata }) => metadata.path === path);
	if (!post) return undefined;

	try {
		const module = await import(`../../routes/post/_source/${post.metadata.number}.js`) as PostModule;
		return module;
	} catch {
		return undefined;
	}
};