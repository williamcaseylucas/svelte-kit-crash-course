import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// dummyjson.com/posts
type Post = {
	title: string;
	body: string;
};

const getPosts = async () => {
	const res = await fetch('https://dummyjson.com/posts');
	const { posts } = await res.json();
	return posts as Post[];
};

// it's a me mario -> "its-a-me-mario"
const slugify = (text: string) => {
	return text
		.replace(/\s/g, '-')
		.replace(/[^a-zA-Z0-9-]/g, '')
		.toLowerCase();
};

const main = async () => {
	const posts = await getPosts();

	posts.forEach(async (post) => {
		await db.post.create({
			data: {
				title: post.title,
				content: post.body,
				slug: slugify(post.title)
			}
		});
	});
};

main();
