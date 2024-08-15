import { env } from '$env/dynamic/private';
import type { PageServerLoad } from '../$types';
import qs from 'qs';
import type { Submission } from '$lib/types/CMS';
import fetchAllFromCMS from '$lib/js/fetchFromCMS';
import getImageObject from '$lib/js/image';
import type { ArtSubmissionData } from '$lib/types/types';

export const config = {
	isr: {
		expiration: false
	}
};

const cmsRestUrl = env.CMS_REST_API_URL;
const eventSlug = 'submissions';
const projectSlug = env.DEV_PROJECT_SUBMISSIONS_SLUG ?? env.PROJECT_SLUG;

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

	const formattedUrl = `${cmsRestUrl}${
		cmsRestUrl?.endsWith('/') ? '' : '/'
	}api/${eventSlug}${query}`;
	const data = await fetchAllFromCMS<Submission>(formattedUrl);

	const retData: ArtSubmissionData[] = data.map((element: Submission) => {
		return {
			id: element.id,
			author: element.author,
			authorIcon: element.srcIcon ? getImageObject(element.srcIcon) : undefined,
			message: element.message ?? '',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			images: element.media!.map((mediaElem: any) => getImageObject(mediaElem))
		};
	});

	return {
		data: retData
	};
} satisfies PageServerLoad;
