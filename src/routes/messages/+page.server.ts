import { CMS_REST_API_URL, DEV_PROJECT_SUBMISSIONS_SLUG, PROJECT_SLUG } from '$env/static/private';
import type { PageServerLoad } from '../$types';
import qs from 'qs';
import type { Project, Submission } from '$lib/types/CMS';
import fetchAllFromCMS from '$lib/js/fetchFromCMS';
import getImageObject from '$lib/js/image';
import type { ArtSubmissionData } from '$lib/types/types';
import { extractFilAttr } from '$lib/js/extractFilAttr';

export const config = {
	isr: {
		expiration: false
	}
};

const projectSlug =
	DEV_PROJECT_SUBMISSIONS_SLUG.length > 0 ? DEV_PROJECT_SUBMISSIONS_SLUG : PROJECT_SLUG;

export const load = async function () {
	const query = qs.stringify(
		{
			where: {
				'project.slug': {
					equals: projectSlug
				}
			}
		},
		{ addQueryPrefix: true }
	);

	const queryGeneral = qs.stringify(
		{
			where: {
				slug: {
					equals: PROJECT_SLUG
				}
			}
		},
		{ addQueryPrefix: true }
	);

	const formattedUrl = `${CMS_REST_API_URL}${
		CMS_REST_API_URL?.endsWith('/') ? '' : '/'
	}api/submissions${query}`;
	const data = await fetchAllFromCMS<Submission>(formattedUrl);

	const formattedUrlGeneral = `${CMS_REST_API_URL}${CMS_REST_API_URL?.endsWith('/') ? '' : '/'}api/projects${queryGeneral}`;
	const [project] = await fetchAllFromCMS<Project>(formattedUrlGeneral);

	const projectJson = JSON.parse(
		project.devprops!.find((prop) => prop.key === 'projects')!.value
	);

	const projectData = projectJson.projects;

	const submissions: ArtSubmissionData[] = data.map((element: Submission) => {
		return {
			id: element.id,
			author: element.author,
			authorIcon: element.srcIcon ? getImageObject(element.srcIcon) : undefined,
			message: {
				en: element.message ?? '',
				ja: extractFilAttr(element.filterableAttributes, 'message_jp') ?? '',
				zh: extractFilAttr(element.filterableAttributes, 'message_zh') ?? ''
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			images: element.media!.map((mediaElem: any) => getImageObject(mediaElem)),
			country: extractFilAttr(element.filterableAttributes, 'country')
		};
	});

	return {
		projectData,
		submissions
	};
} satisfies PageServerLoad;
