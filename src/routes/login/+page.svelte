<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';
	export let form: ActionData;

	const login: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'success') {
				console.log(result);
				await applyAction(result);
			}
		};
	};
</script>

<pre>
	{JSON.stringify(form, null, 2)}
</pre>

<form method="POST" use:enhance={login}>
	<input type="text" name="user" value={form?.data?.user ?? ''} />
	{#if form?.errors?.user}
		<p class="errors">Username invalid</p>
	{/if}
	<input type="password" name="password" value={form?.data?.password ?? ''} />
	{#if form?.errors?.password}
		<p class="errors">Password invalid</p>
	{/if}
	<button type="submit">Login</button>
</form>

<style>
	.errors {
		color: tomato;
	}
</style>
