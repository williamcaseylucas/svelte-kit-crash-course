import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// check if user is logged in
	// const session = event.cookies.get('session')
	// const user = await getUser(session)

	// If this information is authenticated, we can pass information for entire application (can go to /user and see 'Test')
	// @ts-ignore
	event.locals.user = 'Test';

	if (event.url.pathname.startsWith('/banana')) {
		return new Response('🍌🍌');
	}
	// default behavior
	return resolve(event);
};
