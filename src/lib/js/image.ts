import { BYPASS_IMAGINARY_PROXY, CMS_REST_API_URL } from '$env/static/private';
import getImaginaryProxyImageURL from './imaginaryImageProxy';
import type { Image } from '$lib/types/types';

function getProxyImageURL(
	src: string,
	width: number | undefined,
	height: number | undefined,
	quality = 80
): string {
	if (BYPASS_IMAGINARY_PROXY === 'true') {
		return new URL(src, CMS_REST_API_URL).toString();
	} else {
		return getImaginaryProxyImageURL(src, width, height, quality);
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDownscaledProxyImageURL(cmsImage: any): string {
	return cmsImage.width > cmsImage.height
		? getProxyImageURL(cmsImage.url, 800, undefined)
		: getProxyImageURL(cmsImage.url, undefined, 800);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getImageObject(cmsImageObj: any): Image {
	let cmsImage;
	if ('image' in cmsImageObj) {
		cmsImage = cmsImageObj.image;
	} else {
		cmsImage = cmsImageObj;
	}

	return {
		src:
			cmsImage.width > cmsImage.height
				? getProxyImageURL(cmsImage.url, 1920, undefined)
				: getProxyImageURL(cmsImage.url, undefined, 1080),
		smallSrc:
			cmsImage.width > 800 || cmsImage.height > 800
				? getDownscaledProxyImageURL(cmsImage)
				: undefined,
		alt: cmsImage.alt ?? '',
		height: cmsImage.height,
		width: cmsImage.width,
		type: cmsImageObj.type,
		subtype: cmsImageObj.subtype
	};
}

export default getImageObject;
