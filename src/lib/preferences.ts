import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const preferences = writable<{
	firstLanguage: string;
	targetLanguage: string;
}>(
	JSON.parse(
		browser
			? localStorage?.getItem('l_preferences') ||
					JSON.stringify({
						firstLanguage: 'Spanish',
						targetLanguage: 'English'
					})
			: JSON.stringify({
					firstLanguage: 'Spanish',
					targetLanguage: 'English'
				})
	)
);

preferences.subscribe((value) => {
	if (!browser) return;
	localStorage?.setItem('l_preferences', JSON.stringify(value));
});
