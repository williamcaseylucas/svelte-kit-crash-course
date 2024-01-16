import db from '$lib';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	console.log(params);

	const post = await db.post.findUnique({
		where: { slug: params.slug }
	});

	// This should be run after getting data according to Svelte
	// const parentData = await parent();
	// console.log(parentData)

	if (!post) throw error(404, 'Post not found');

	return { post };
};
