import { CMS_REST_API_URL, DEV_PROJECT_SUBMISSIONS_SLUG, PROJECT_SLUG } from '$env/static/private';
import type { PageServerLoad } from '../$types';
import qs from 'qs';
import type { Project, Submission } from '$lib/types/CMS';
import fetchAllFromCMS from '$lib/js/fetchFromCMS';
import getImageObject, { getProxyImageURL } from '$lib/js/image';
import type { ArtSubmissionData, ProjectData, SingleProject } from '$lib/types/types';
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

	const projectData = projectJson.projects.map((element: ProjectData) => {
		return {
			year: element.year,
			projects: element.projects.map((projectElem: SingleProject) => {
				return {
					name: projectElem.name,
					url: projectElem.url,
					image: projectElem.image
						? getProxyImageURL(projectElem.image, 1280, undefined)
						: undefined,
					video: projectElem.video
				};
			})
		};
	});

	const submissions: ArtSubmissionData[] = data.map((element: Submission) => {
		return {
			id: element.id,
			author: element.author,
			authorIcon: element.srcIcon ? getImageObject(element.srcIcon, 128) : undefined,
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
		submissions,
		underConstruction: getProxyImageURL(
			'https://cdn.holoen.fans/hefw/media/underconstruction.webp',
			1280,
			undefined
		)
	};
} satisfies PageServerLoad;
