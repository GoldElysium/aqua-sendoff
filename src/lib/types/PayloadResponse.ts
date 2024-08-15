// Copied from https://github.com/GoldElysium/hef-website/blob/46f80f80759cae11090a3d0ac21cc328cfe8dcc8/src/types/PayloadResponse.ts

export default interface PayloadResponse<T = any> {
	docs: T[];
	totalDocs: number;
	limit: number;
	totalPages: number;
	page: number;
	pagingCounter: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: number | null;
	nextPage: number | null;
}
