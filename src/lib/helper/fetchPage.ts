import type Page from '../types/page';


export interface PageModule {
	metadata: Page;
	html: string;
}

async function _fetchPages<T extends boolean>(metadataOnly: T) {
	let allPosts = (
		await Promise.all(
			Object.entries(import.meta.glob('../../routes/_page/*.js')).map(
				async ([, loader]) => {
					const module = (await loader()) as PageModule;
					return metadataOnly ? { metadata: module.metadata } : module;
				}
			)
		)
	) as (T extends true ? { metadata: Page } : PageModule)[]

	// filter out error page
	allPosts = allPosts.filter(({ metadata: { title } }) => title && title !== '__error');
	// sort by priority desc
	allPosts = allPosts.sort((a, b) => (b.metadata.priority ?? 0) - (a.metadata.priority ?? 0));

	return allPosts;
}

export const fetchPages = async () => {
	return _fetchPages(false);
}

export const fetchPagesMeta = async () => {
	return _fetchPages(true);
}

// path is title (lowercase) or custom path
// pages are few, it's ok to fetch all and then find
export const fetchPage = async (path: string) =>
	(await fetchPages()).find(
		({ metadata: { path: identifyPath, title } }) =>
			path === identifyPath || path === title.toLowerCase()
	);
