import type { RequestHandler } from './$types';

import db from '$lib';
import { json } from '@sveltejs/kit';

// /api/posts
export const GET: RequestHandler = async ({ url }) => {
	// const post = await db.post.findMany({
	// 	take: Math.round(Math.random() * 30) // grabs random posts
	// });
	// refresh for 60 seconds and cache to disk (http caching)
	// event.setHeaders({ 'Cache-Control': 'max-age=60' });

	// event.setHeaders(
	// 	{ 'Cache-Control': 'public, max-age=0, s-maxage=60' } // Good for SSR
	// );

	const limit = Number(url.searchParams.get('limit') ?? 30);
	const order = url.searchParams.get('order') ?? 'asc';

	console.log(limit, order);

	const post = await db.post.findMany({
		orderBy: { id: order },
		take: limit
	});

	return json(post);
};
