import { languageTag } from './paraglide/runtime';

/**
 * Prepends the correct language tag to a specific link
 */
export function createLink(link: string) {
    return '/' + languageTag() + link
}