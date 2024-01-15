<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	// const { posts } = data;
	$: ({ posts } = data);

	// ---- simulating CSR interaction ----
	// import type { Post } from '@prisma/client';

	// Fetch results with CSR
	// async function getPosts() {
	// 	const response = await fetch('api/posts');
	// 	const posts: Post[] = await response.json();
	// 	return posts;
	// }

	// ---- simulating form interaction ----
	// async function subscribe(event: Event) {
	// 	const form = event.target as HTMLFormElement;
	// 	const data = new FormData(form);

	// 	await fetch('/api/newsletter', {
	// 		method: 'POST',
	// 		body: data
	// 	});
	// }
</script>

<h1>Posts</h1>
<p>Showing {posts.length} posts.</p>
{#each posts as { slug, title }}
	<ul>
		<li>
			<a href="/posts/{slug}">{title}</a>
		</li>
	</ul>
{/each}

<!-- For debugging -->
<!-- <pre>
	{JSON.stringify(posts, null, 2)}
</pre> -->
<!-- <h1>Posts</h1>
	{#await getPosts()}
	<p>Loading...</p>
	{:then posts}
	<p>Showing {posts.length} posts.</p>
	
	{#each posts as { title, slug }}
		<ul>
			<li>
				<a href="/posts/{slug}">{title}</a>
			</li>
		</ul>
	{/each}
{:catch error}
	<p>{error.message}</p>
{/await} -->

<!-- Simple form submission -->
<!-- <form on:submit|preventDefault={subscribe}>
	<input type="email" name="email" />
	<button>Subscribe</button>
</form> -->
