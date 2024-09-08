import { OPENAI_API_KEY } from '$env/static/private';
import { openai } from '$lib/openai';
import { createOpenAI } from '@ai-sdk/openai';
import { json } from '@sveltejs/kit';
import { streamText, type CoreMessage } from 'ai';

export async function POST({ request, url }) {
	const { prompt } = await request.json();

	const completion = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{ role: 'user', content: `Translate: "${prompt}" into ${url.searchParams.get('lang')} and respond with nothing but the translation` }
		],
		max_tokens: 500
	});

	return json({ translation: completion.choices[0].message.content });
}
