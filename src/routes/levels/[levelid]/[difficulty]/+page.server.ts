import { levels } from '$lib/levels.js';
import { error } from '@sveltejs/kit';

export async function load({ params: { levelid, difficulty } }) {
	const level = levels.find((l) => l.id === levelid);

	if (!level) error(404);

	return { level, difficulty };
}
