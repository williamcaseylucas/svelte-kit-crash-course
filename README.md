# svelte-kit-crash-course

## commands

#### without cli

- pnpm init
- pnpm i -D vite @sveltejs/kit @sveltejs/adapter-auto svelte @sveltejs/vite-plugin-svelte

#### with cli

- pnpm create svelte
- pnpx prisma init --datasource-provider sqlite
- pnpm i @prisma/client

## Prisma

- sqllite url "file:./dev.db"
- added seed.ts file to populate our db with posts from dummyjson.com/posts and created custom command within package.json to faciliate this with "prisma" directive
- in /lib we define our Prisma db variable

#### commands to run Prisma

- pnpx prisma migrate dev --name init
  - ran seed command we created in package.json adn now we have db.sqlite
- pnpx prisma studio
- pnpx prisma migrate reset
  - removes local db

## create custom snippet

- ctrl + shift + p
- User snippets
- choose 'svelte'
- added sp, sl, and sc, pre
  - svelte page
  - svelte layout
  - svelte script
  - JSON.stringify for error message

## Regex

- start with //g
  - put \s in between for white space replacement
  - put a-zA-Z0-9 to say any letters and numbers
  - put ^ at beginning of the previous bullet point to say everything that doesn't include this
  - use .replace(REGEX, WHAT_TO_REPLACE_WITH)
  - if you're replacing with a '-', then you need to add this at the end so that it doesn't remove your dash
    - a-zA-Z0-9-

## Svelte psuedo commands

- on:submit|preventDefault={subscribe}
  - for form
  - name is how .get() finds your item

## SvelteKit

- +page.svelte
- +layout.svelte
- use routes/lib for reused components
  - can access with $lib
- place images and favicon into /static
- to run in the browser
  - sveltekit.new
- add 'lang="ts"' to script tags for typescript
- in app.html
  - data-sveltekit-preload-data="hover"
  - means we prefetch site before clicking just by hovering
- onMount -> useEffect()
- onDestroy -> when you leave the page
- pnpm run build && pnpm run preview (build and run local build)
- <slot/> is like passing children
- can create app.css in /routes folder for global styles
- layouts are layered from the base model
- kitEndpoint
  - shortcut to generate GET request for /api in Svelte

## Api

Json

- standard
  return new Response(JSON.stringify({ success: true }), {
  headers: {
  'Content-Type': 'application/json'
  }
  });
- with svelte json
  export const GET: RequestHandler = async () => {
  const post = await db.post.findMany({});
  return json(post);
  };
- event.setHeaders({ 'Cache-Control': 'max-age=60' });
  - caches response -> Don't have to do in production, Vercel takes care of this for you

## Routes

- [[lang]]/about
  - means you can either have 123/about or /about
- [...path]
  - means unknown extra params
- ensure we allow only certain types of url configs
  - /params/slug.ts
  - then add [slug=slug] if the second "slug" is the name of the .ts file
  - now 404 error will be thrown if you insert a space, for example, in the url

## $app/stores

- can pull {page} from it and use $page by calling JSON.stringify and will print all the contents out
- throw error (from svelte) and it will return the message itself

  - example in +page.ts for /create and +error.svelte
  - use 'pre' snippet

- ## +page.ts
- +error.svelte
  - is what is loaded on error

## Picocss

- custom css styling
- add to app.html

## Prettier

- commands to format all files in package.json

## Playwright

- lets you test across browsers

## Vitest

- Unit tests to test output

## JS Log types for auto completion

- /\*_ @type {import('vite').UserConfig} _/
