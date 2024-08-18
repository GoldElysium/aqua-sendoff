import { CMS_REST_API_URL, DEV_PROJECT_TIMELINE_SLUG, PROJECT_SLUG } from '$env/static/private';
import type { PageServerLoad } from './$types';
import qs from 'qs';
import fetchAllFromCMS from '$lib/js/fetchFromCMS';
import { languageTag } from '$lib/paraglide/runtime';
import type { Event } from '$lib/types/CMS';

export const config = {
	isr: {
		expiration: false
	}
};

const projectSlug = DEV_PROJECT_TIMELINE_SLUG.length > 0 ? DEV_PROJECT_TIMELINE_SLUG : PROJECT_SLUG;

export const load = async function () {
	const locale = languageTag();

	const query = qs.stringify(
		{
			where: {
				project: {
					slug: {
						equals: projectSlug
					}
				}
			},
			locale: locale === 'ja' ? 'jp' : locale
		},
		{ addQueryPrefix: true }
	);

	const formattedUrl = `${CMS_REST_API_URL}${CMS_REST_API_URL?.endsWith('/') ? '' : '/'}api/events${query}`;

	const events = await fetchAllFromCMS<Event>(formattedUrl);

	const grouppedEvents: Record<number, Event[]> = {};

	events.forEach((event) => {
		const date = new Date(event.date);
		const year = date.getFullYear();

		if (!grouppedEvents[year]) {
			grouppedEvents[year] = [];
		}

		grouppedEvents[year].push(event);
	});

	return {
		events: Object.entries(grouppedEvents).map(([year, events]) => ({
			year: Number(year),
			events,
			id: year
		}))
	};
} satisfies PageServerLoad;
