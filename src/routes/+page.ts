import type { Post } from '@prisma/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/posts');
	const posts: Post[] = await res.json();
	return { posts };
};
