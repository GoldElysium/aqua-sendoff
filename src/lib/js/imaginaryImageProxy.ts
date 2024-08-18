// Cut down version of:
// https://github.com/GoldElysium/hef-website/blob/master/src/ui/Image.tsx
// Basically removes the additional actions, since we're only using
// the imaginary proxy as a cache.

import { IMAGINARY_URL, IMAGINARY_SECRET } from '$env/static/private';
import { createHmac } from 'node:crypto';

export default function getImaginaryProxyImageURL(
	src: string,
	width: number | undefined,
	height: number | undefined,
	quality = 90
): string {
	if (typeof src !== 'string') throw new Error('Cannot optimize static import');

	if (src.toLowerCase().endsWith('.gif')) return src;

	const query = ['type=webp', 'stripmeta=true', `quality=${quality}`];
	if (width !== undefined) {
		query.push(`width=${width}`);
	}

	if (height !== undefined) {
		query.push(`height=${height}`);
	}

	const urlParam = encodeURIComponent(src.replace('localhost', 'host.docker.internal'));

	const hmac = createHmac('sha256', IMAGINARY_SECRET!)
		.update('/resize')
		// Yes, it needs to be sorted. See https://github.com/h2non/imaginary/issues/235#issuecomment-453833712
		// And apparently go doesn't use %20 for spaces...
		.update(
			[
				...query,
				`url=${urlParam.replace(/%20/g, '+').replace(/\(/g, '%28').replace(/\)/g, '%29')}`
			]
				.sort()
				.join('&')
		)
		.digest('base64url');

	return `${IMAGINARY_URL!}/resize?${[...query, `url=${urlParam}`]
		.sort()
		.join('&')}&sign=${hmac}`;
}
