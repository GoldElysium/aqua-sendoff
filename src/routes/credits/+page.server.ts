import { env } from '$env/dynamic/private';
import qs from 'qs';
import fetchAllFromCMS from '$lib/js/fetchFromCMS';
import type { Project } from '$lib/types/CMS';
import type { CreditGroup } from '$lib/types/types';

export const config = {
	isr: {
		expiration: false
	}
};

const cmsRestUrl = env.CMS_REST_API_URL;
const projectSlug = env.PROJECT_SLUG;

export const load = async function () {
	const query = qs.stringify(
		{
			where: {
				slug: {
					equals: projectSlug
				}
			}
		},
		{ addQueryPrefix: true }
	);

	const formattedUrl = `${cmsRestUrl}${cmsRestUrl?.endsWith('/') ? '' : '/'}api/projects${query}`;

	const [project] = await fetchAllFromCMS<Project>(formattedUrl);

	return JSON.parse(
		project.devprops!.find((prop) => prop.key === 'contributors')!.value
	) as Record<string, CreditGroup[]>;
};
