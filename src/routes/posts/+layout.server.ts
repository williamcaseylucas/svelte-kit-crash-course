import db from '$lib';
import type { LayoutServerLoad } from './$types';

// Data will be available in entire /posts route
export const load: LayoutServerLoad = async (event) => {
	// Grab only the title and slug properties and only grab 4
	const posts = await db.post.findMany({
		select: {
			title: true,
			slug: true
		},
		take: 4
	});

	return { posts };
};
