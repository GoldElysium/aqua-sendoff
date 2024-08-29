import { BYPASS_IMAGINARY_PROXY, CMS_REST_API_URL } from '$env/static/private';
import getImaginaryProxyImageURL from './imaginaryImageProxy';
import type { Image } from '$lib/types/types';

export function getProxyImageURL(
	src: string,
	width: number | undefined,
	height: number | undefined,
	quality = 90
): string {
	if (BYPASS_IMAGINARY_PROXY === 'true') {
		return new URL(src, CMS_REST_API_URL).toString();
	} else {
		return getImaginaryProxyImageURL(src, width, height, quality);
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDownscaledProxyImageURL(cmsImage: any, target = 800): string {
	return cmsImage.width > cmsImage.height
		? getProxyImageURL(cmsImage.url, Math.min(cmsImage.width, target), undefined)
		: getProxyImageURL(cmsImage.url, undefined, Math.min(cmsImage.height, target));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getImageObject(cmsImageObj: any, smallSize = 800): Image {
	let cmsImage;
	let url;
	let smallUrl;
	if ('image' in cmsImageObj) {
		cmsImage = cmsImageObj.image;
		url =
			cmsImage.width > cmsImage.height
				? getProxyImageURL(cmsImage.url, 1920, undefined)
				: getProxyImageURL(cmsImage.url, undefined, 1080);
		smallUrl =
			cmsImage.width > smallSize || cmsImage.height > smallSize
				? getDownscaledProxyImageURL(cmsImage, smallSize)
				: undefined;
	} else {
		cmsImage = cmsImageObj;
		url = cmsImage.url;
		smallUrl = cmsImage.smallUrl;
	}

	return {
		src: url,
		smallSrc: smallUrl,

		alt: cmsImage.alt ?? '',
		height: cmsImage.height,
		width: cmsImage.width,
		type: cmsImageObj.type,
		subtype: cmsImageObj.subtype
	};
}

export default getImageObject;
