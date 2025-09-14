import { fetchPosts } from '$lib/helper/fetchPosts';
import { Feed } from 'feed';
import { BIO, BLOG_NAME, DOMAIN, EMAIL, USER_NAME, LANGUAGE } from '$lib/constants';

const createDescription = (html: string, maxLength: number = 300): string => {
	return html
		.replace(/<[^>]*>/g, '') // remove HTML tags
		.replace(/\s+/g, ' ') // squish whitespace
		.trim()
		.slice(0, maxLength) + (html.length > maxLength ? '...' : '');
};

export const get = async () => {
	if (!DOMAIN) {
		return {
			status: 302,
			redirect: '/'
		};
	}
	const posts = await fetchPosts({ limit: 20 });
	const last = posts.list.sort(
		(a, b) =>
			new Date(b.metadata.updated || b.metadata.published).valueOf() -
			new Date(a.metadata.updated || a.metadata.published).valueOf()
	)?.[0];
	const feed = new Feed({
		id: DOMAIN,
		title: BLOG_NAME,
		link: DOMAIN,
		language: LANGUAGE,
		description: BIO,
		copyright: `All rights reserved ${new Date().getFullYear()}, ${USER_NAME}`,
		updated: new Date(last?.metadata.updated || last?.metadata.published || new Date()),
		feedLinks: { atom: `${DOMAIN}/atom.xml` },
		author: {
			name: USER_NAME,
			email: EMAIL,
			link: DOMAIN
		}
	});

	posts.list.forEach(({ metadata, html }) => {
		feed.addItem({
			id: `${DOMAIN}/post/${metadata.path || metadata.number}`,
			link: `${DOMAIN}/post/${metadata.path || metadata.number}`,
			title: metadata.title,
			date: new Date(metadata.updated || metadata.published),
			published: new Date(metadata.published),
			description: metadata.excerpt || createDescription(html, 300),
			content: html,
			category: metadata.labels
		});
	});
	return {
		status: 200,
		headers: {
			'Content-Type': 'application/atom+xml'
		},
		body: feed.atom1()
	};
};
