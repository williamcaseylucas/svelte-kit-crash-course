import type { RequestHandler } from './$types';

import db from '$lib';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const post = await db.post.findMany({
		take: Math.round(Math.random() * 30) // grabs random posts
	});

	// refresh for 60 seconds and cache to disk (http caching)
	// 
	event.setHeaders({ 'Cache-Control': 'max-age=60' });
	return json(post);
};
