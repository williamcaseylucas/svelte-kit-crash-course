<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	// const { posts } = data;
	$: ({ posts } = data);

	function rerunLoadFunction() {
		// a)
		invalidate('app:posts');
		// // b)
		// invalidate('api/posts');
		// // c)
		// invalidate((url) => url.href.includes('posts'));
		// // d) Nuclear option
		// invalidateAll();
	}

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

{#if $page.data.user}
	Welcome {$page.data.user}
{/if}

<h1>Posts</h1>
<button on:click={rerunLoadFunction}>Rerun</button>
<p>Showing {posts.length} posts.</p>
{#each posts as { slug, title }}
	<ul>
		<li>
			<a href="/posts/{slug}">{title}</a>
		</li>
	</ul>
{/each}

<!-- Forms -->
<h1>Forms</h1>
<form action="/login" method="POST">
	<input type="text" name="user" />
	<input type="password" name="password" />
	<button type="submit">Login</button>
</form>

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
