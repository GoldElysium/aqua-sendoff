import type { Submission } from '$lib/types/CMS';

export function extractFilAttr(
	attr: Submission['filterableAttributes'] | null | undefined,
	name: string
) {
	if (!attr) {
		return null;
	}
	const result = attr.find((element) => element.name === name);
	if (!result) {
		return null;
	}
	return result.values?.[0].value;
}
