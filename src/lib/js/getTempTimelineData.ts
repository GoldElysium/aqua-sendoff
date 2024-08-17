import type { TimelineData, YearlyTimelineData, Image } from '$lib/types/types';

export default function getTempTimelineData(): Array<YearlyTimelineData> {
	const years: Array<YearlyTimelineData> = [];
	const tmpImages: Image[] = Array.from({ length: 1 }, (_, i) => ({
		src: `https://wallpaperwaifu.com/wp-content/uploads/2021/03/minato-aqua-birthday-virtual-youtuber-thumb-360x203.jpg`,
		alt: `Image ${i + 1}`,
		height: 600,
		width: 800,
		type: 'image',
		subtype: 'image'
	}));
	for (let i = 2018; i < 2025; i++) {
		const events: Array<TimelineData> = [];
		const numOfEvent = Math.random() * 11;
		for (let j = 0; j < numOfEvent; j++) {
			events.push({
				id: `${i}-${j}`,
				date: new Date(i, j, 1),
				title: `Event ${j + 1} in ${i}`,
				images: tmpImages,
				content:
					'Lorem ispum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
			});
		}
		years.push({
			year: i,
			events,
			id: `${i}`
		});
	}
	return years;
}
