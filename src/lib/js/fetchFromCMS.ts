const numObjsPerRequest = 100;
const objDepth = 5;

import { PAYLOAD_BYPASS_RATE_LIMIT_KEY } from '$env/static/private';
import qs from 'qs';

export default async function fetchAllFromCMS<T>(cmsUrl: string | URL): Promise<Array<T>> {
	const data: Array<T> = [];
	const inputUrlObj = new URL(cmsUrl);
	const urlQueryParams = qs.parse(inputUrlObj.search, { ignoreQueryPrefix: true });
	urlQueryParams['limit'] = numObjsPerRequest.toString();
	urlQueryParams['depth'] = objDepth.toString();

	let hasAllData = false;
	do {
		const urlObjQuery = qs.stringify(urlQueryParams, { addQueryPrefix: true });
		const urlObj = new URL(`${inputUrlObj.origin}${inputUrlObj.pathname}${urlObjQuery}`);

		const response = await fetch(urlObj, {
			headers: {
				'X-RateLimit-Bypass': PAYLOAD_BYPASS_RATE_LIMIT_KEY ?? ''
			} as Record<string, string>
		});
		const respData = await response.json();

		respData.docs.forEach((element: T) => data.push(element));

		if (respData.hasNextPage) {
			urlQueryParams['page'] = respData.nextPage.toString();
		} else {
			hasAllData = true;
		}
	} while (!hasAllData);

	return data;
}
