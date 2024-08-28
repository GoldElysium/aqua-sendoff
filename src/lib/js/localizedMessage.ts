import * as m from '$lib/paraglide/messages';

export const localizedMessage = (message: string) => {
	// @ts-expect-error - There is no error, shut up ts
	return m[message] ? m[message]() : message;
};
