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

#### Zod

- pnpm i zod zod-form-data
- use safeParse, Object.fromEntries, and error.flatten().fieldErrors
- Example in /routes/login

## Notes

- Skipped advanced layouts

## Hooks

- resolve(event) is normal behavior
- can check pathname
- can check if user is logged in
- authentication
  - Will have you create +layout.server.ts which returns user: locals.user as object to see if user is logged in
  - This is because it becomes available in $page store
- can access this information on client via $app/stores "page"

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

## Typescript

- if it is out of sync try
  - > Svelte: Restart Language Server
  - > Developer: Reload Window

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
  - shortcut to generate GET request for /api in Svelte (+server.ts)
- kitLoad
  - shortcut for +(page/layout).ts or +(page/layout).server.ts
- SHOULD ALWAYS BE './$types' !!

## Urls

- can pass /posts/{slug} directly in string without ``

## meta data

- can you {page} from '$app/stores' to get global data and set it via <svelte:head>

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
  - go to network tab and check the "Disable Cache" button to have it fetch a different number of posts each time you refresh

## How to use SSR

- +pages.svelte uses CSR
- +server.ts is for backend route
- +page.ts is for SSR
  - update page with content for page and nothing else using PageLoad
  - utilizes its own fetch api
- Could do const {posts} = data but this isn't reactive if something changes with the data
  - Better to do this $: ({ posts } = data);

## Page.ts

- can extract {fetch} or {params}
- use PageLoad type
- does not work with Prisma values because it tries to grab this from the browser

## Page.server.ts

- Good for accessing db values
- PageServerLoad type
- only runs on the server, accessing secret values
  - use +page.ts for everything else

## Layout Page.ts and Page.server.ts

- Can use these for layouts as well
- combines it with other server side rendered aspects of any of the child components
- LayoutData in .svelte and LayoutServerLoad in .server.ts

## Datetime

- use Intl.DateTimeFormat().format(date) for useful formatting options

## Errors

- import {error} from @sveltejs/kit

## Routes

- [[lang]]/about
  - means you can either have 123/about or /about
- [...path]
  - means unknown extra params
- ensure we allow only certain types of url configs
  - /params/slug.ts
  - then add [slug=slug] if the second "slug" is the name of the .ts file
  - now 404 error will be thrown if you insert a space, for example, in the url

## API Creation

- in server.ts
- {params, url, route} are available
- in api/posts
  - using ?limit=4&order=desc as params
  - gives us as searchParams:
    - URLSearchParams { 'limit' => '4', 'order' => 'desc' },
- can use '??' as an "||" alternative

## Working with forms

- Create /lib/server/database.ts which has array of values

## Add global styles to root layout

- :global(\*\*any_number_of_vals){css}

## How to create Svelte kit api route with extension

- right click on folder and click svelte file
- can add page.svelte, page.server.ts, and server.ts for route
- use space to select files

## Forms (standard)

- action -> Means the route we want this to be handled in
- GET request
  - adds info to url with : "action?(name for first input)&(name for second input)
  - insecure since it adds password to url
- POST request
  - use server side to add data
  - action still is appended to url
- can create hidden input field with id that can be sent to the server
- in server.ts, can pull out request and grab formdata from that
- whatever button "name" you gave to the hidden button, that is the value you can pass into formData.get('')
- Can return responses as so
  - return json(data, { status: 400 });
  - json({success: true})
- example in /routes/todos

## Forms (SvelteKit form actions)

- Don't need server.ts where everything is configured on server
- only need page.server.ts and page.svelte
- create actions: Actions where you predefine methods that you want to do stuff
- error validation
  - if (!todo) {
    return fail(400, { todo, missing: true });
    }
- export let form: ActionData to grabt info from backend
- <form method="POST" action="?/removeTodo"> -> Tells Sveltekit to execute this query param
- <button formaction="?/clearTodos" class="secondary" type="submit">Clear</button>
  - Overrides Parent form action and calls this method instead
- just ? puts the function in, "/" calls it
- works before js which makes your app more resilient

## use:enhance -> For forms

- can just call use:enhance for basic functionality
- use:enhance={addTodo}

  - const addTodo: SubmitFunction = (input) => {
    // do something before the form submits

        return async (options) => {
        	// do something after the form submits
          <!-- can use update() function here -->
        };

    };

- <button type="submit" aria-busy={loading} class:secondary={loading}>+ Add Todo</button>

  - Can add aria-busy to a boolean value
  - can create conditional class rendering if loading is true

- Invalidates queries and handles updating all form related info with js
- Way to supercharge forms

## Login form validation with Zod

- login callback can be used with use:enhance={login} on form
- use applyAction(result)
- applyAction and update are similar

## Svelte invalidate query from server side (Tanstack query is for frontend)

- Good for reloading data, use afterNavigate to reload components themselves
- on server
  - use "depends("SOME_APP:SOME_VALUE")" on the server
- on client

  - // a)
    invalidate('app:posts');

  - // b) only works with unique url
    invalidate('api/posts');

  - // c)
    invalidate((url) => url.href.includes('posts'));

  - // d) Nuclear option
    invalidateAll();

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
