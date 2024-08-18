import { writable } from "svelte/store";

export const navbarOptions = writable({
	colorScheme: 'dark' as 'dark' | 'light',
});
