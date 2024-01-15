<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({
		post: { title, createdAt, content }
	} = data);

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(date);
	};
</script>

<hgroup>
	<h1>{title}</h1>
	<h2>{formatDate(createdAt)}</h2>
</hgroup>

<div class="content">
	{@html content}
</div>

<div class="posts">
	<h3>Posts</h3>

	<ul>
		{#each data.posts as { slug, title }}
			<li>
				<a href="/posts/{slug}">{title}</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.posts {
		margin-top: 2rem;
	}
</style>
