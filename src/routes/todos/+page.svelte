<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let loading = false;
	const addTodo: SubmitFunction = (input) => {
		// do something before the form submits
		loading = true;

		return async (options) => {
			loading = false;
			await options.update();
			// do something after the form submits
		};
	};

	// -- Traditional Form with server.ts --
	// type Data = {
	// 	success: boolean;
	// 	errors: Record<string, string>;
	// };

	// let form: Data;

	// todo
	// async function addTodo(event: Event) {
	// 	const formEl = event.target as HTMLFormElement;
	// 	const data = new FormData(formEl);

	// 	const response = await fetch(formEl.action, {
	// 		method: 'POST',
	// 		body: data
	// 	}); // from our backend

	// 	const responseData = await response.json();

	// 	form = responseData;
	// 	formEl.reset(); // make it disappear from input line

	// 	await invalidateAll(); // nuclear option
	// }

	// todo
	// async function removeTodo(event: Event) {
	// 	const formEl = event.target as HTMLFormElement;
	// 	const data = new FormData(formEl);

	// 	const response = await fetch(formEl.action, {
	// 		method: 'DELETE',
	// 		body: data
	// 	});

	// 	await invalidateAll();
	// }
</script>

<pre>
	{JSON.stringify(form, null, 2)}
</pre>

<pre>
	{JSON.stringify(data, null, 2)}
</pre>

<ul>
	{#each data.todos as todo}
		<li>
			<span>{todo.text}</span>
			<!-- Javascript way -->
			<form method="POST" action="?/removeTodo" use:enhance>
				<input type="hidden" name="id" value={todo.id} />
				<button type="submit" class="delete">X</button>
			</form>
			<!-- Previous way of doing it -->
			<!-- <form on:submit|preventDefault={removeTodo} method="POST">
				<input type="hidden" name="id" value={todo.id} />
				<button type="submit" class="delete">X</button>
			</form> -->
		</li>
	{/each}
</ul>

<form method="POST" action="?/addTodo" use:enhance={addTodo}>
	<input type="text" name="todo" />
	{#if form?.missing}
		<p class="error">This field is required</p>
	{/if}
	<button type="submit" aria-busy={loading} class:secondary={loading}>
		{#if !loading}
			+ Add Todo
		{/if}
	</button>
	<button formaction="?/clearTodos" class="secondary" type="submit">Clear</button>
</form>
<!-- <form on:submit|preventDefault={addTodo} method="POST">
	<input type="text" name="todo" />
	{#if form?.errors?.todo}
		<p class="error">This field is required</p>
	{/if}
	<button type="submit">+ Add Todo</button>
</form> -->

{#if form?.success}
	<p>Added todo! 🥳</p>
{/if}

<style>
	button.delete {
		color: red;
		font-weight: 900;
	}

	ul {
		padding: 0;
	}

	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	span {
		text-transform: capitalize;
	}

	.delete {
		margin: 0;
		background: none;
		border: none;
	}

	.error {
		color: tomato;
	}
</style>
