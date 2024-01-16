import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	// @ts-ignore
	return new Response(locals.user);
};
