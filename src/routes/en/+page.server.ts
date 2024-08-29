// src/routes/[your-route]/+page.server.ts
import { redirect } from '@sveltejs/kit';

export async function load() {
	throw redirect(302, '/');
}
