import { writable } from 'svelte/store';

export type ScrollPos =
	| 'tlHome'
	| 'tl'
	| 'tlFooter'
	| 'ms'
	| 'msFooter'
	| 'crHome'
	| 'cr'
	| 'crFooter';

export const scrollPos = writable({
	section: 'tl' as ScrollPos
});
