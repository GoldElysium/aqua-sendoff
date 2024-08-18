import { CMS_REST_API_URL, PROJECT_SLUG } from '$env/static/private';
import type { PageServerLoad } from './$types';
import qs from 'qs';
import fetchAllFromCMS from '$lib/js/fetchFromCMS';
import type { Project } from '$lib/types/CMS';
import { languageTag } from '$lib/paraglide/runtime';

export const config = {
	isr: {
		expiration: false
	}
};

export const load = async function () {
	const locale = languageTag();

	const query = qs.stringify(
		{
			where: {
				slug: {
					equals: PROJECT_SLUG
				}
			},
			locale: locale === 'ja' ? 'jp' : locale
		},
		{ addQueryPrefix: true }
	);

	const formattedUrl = `${CMS_REST_API_URL}${CMS_REST_API_URL?.endsWith('/') ? '' : '/'}api/projects${query}`;

	const [project] = await fetchAllFromCMS<Project>(formattedUrl);

	return project;
} satisfies PageServerLoad;
