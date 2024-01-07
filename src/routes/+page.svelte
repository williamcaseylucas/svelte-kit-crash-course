<script lang="ts">
	import type { Post } from '@prisma/client';

	// simulating form interaction
	// async function subscribe(event: Event) {
	// 	const form = event.target as HTMLFormElement;
	// 	const data = new FormData(form);

	// 	await fetch('/api/newsletter', {
	// 		method: 'POST',
	// 		body: data
	// 	});
	// }

	async function getPosts() {
		const response = await fetch('api/posts');
		const posts: Post[] = await response.json();
		return posts;
	}
</script>

<h1>Posts</h1>
{#await getPosts()}
	<p>Loading...</p>
{:then posts}
	<pre>
		{JSON.stringify(posts, null, 2)}
	</pre>
{:catch error}
	<p>{error.message}</p>
{/await}

<!-- <form on:submit|preventDefault={subscribe}>
	<input type="email" name="email" />
	<button>Subscribe</button>
</form> -->
