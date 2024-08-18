type Image = {
	src: string;
	smallSrc?: string; // Used in cases where we need a smaller version if the base image is too big!
	alt: string;
	height: number;
	width: number;
	type: string;
	subtype: string;
};

type TimelineData = {
	id: string;
	date: Date;
	title: string;
	background_image?: Image;
	images: Array<Image>;
	// eslint-disable-next-line
	content: any;
};

type YearlyTimelineData = {
	year: number;
	events: Array<TimelineData>;
	id: string;
};

type ArtSubmissionData = {
	id: string;
	author: string;
	authorIcon?: Image;
	message: string;
	images: Array<Image>;
};

type CreditGroup = {
	groupName: string;
	members: Array<string>;
};

export type { Image, TimelineData, YearlyTimelineData, ArtSubmissionData, CreditGroup };
