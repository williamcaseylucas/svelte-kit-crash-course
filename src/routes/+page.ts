import type { Post } from '@prisma/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, depends }) => {
	const random = Math.round(Math.random() * 30);
	const res = await fetch(`/api/posts?limit=${random}`);
	const posts: Post[] = await res.json();

	// key to invalidate
	depends('app:posts');

	return { posts };
};
