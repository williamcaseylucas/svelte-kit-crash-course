import { addTodo, clearTodos, getTodos, removeTodo } from '$lib/server/database';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const todos = getTodos();
	return { todos };
};

export const actions: Actions = {
	addTodo: async ({ request }) => {
		const formData = await request.formData();
		const todo = formData.get('todo') as string;

		if (!todo) {
			return fail(400, { todo, missing: true });
		}

		addTodo(todo);

		return { success: true };
	},
	removeTodo: async ({ request }) => {
		const formData = await request.formData();
		const todoId = Number(formData.get('id'));

		removeTodo(todoId);

		return { success: true };
	},
	clearTodos: async () => {
		clearTodos(); // our predefined db function
	}
};
