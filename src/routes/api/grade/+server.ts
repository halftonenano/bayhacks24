import { OPENAI_API_KEY } from '$env/static/private';
import { createOpenAI } from '@ai-sdk/openai';
import { json } from '@sveltejs/kit';
import { generateObject, streamObject, streamText, type CoreMessage } from 'ai';
import { z } from 'zod';

const openai = createOpenAI({
	apiKey: OPENAI_API_KEY
});

export async function POST({ request, url: { searchParams } }) {
	const { prompt } = await request.json();

	// const result = await streamText({
	// 	model: openai('gpt-4o-mini'),
	// 	// @ts-ignore
	// 	system: 'Explain how to translate a given phrase into spanish with clear, concise steps',
	// 	prompt: `Help me translate the phrase: "${prompt}"`,
	// 	maxTokens: 500
	// });

	const targetlang = searchParams.get('tlang');
	const firstlang = searchParams.get('flang');

	const { object } = await generateObject({
		model: openai('gpt-4o-2024-08-06'),
		schema: z.object({
			grades: z.object({
				letter_grade: z.string().describe('overall letter grade from A+ to F'),
				grammer: z.number().describe('number from 0 - 10'),
				vocab: z.number().describe('number from 0 - 10')
			})
		}),
		prompt: `The user's native language is ${firstlang} and is trying to learn ${targetlang}. Grade this practice conversation between the user and the character based on grammer and vocabulary. Be very harsh and blunt with your grading.\n\n===\n\n${prompt}`
	});

	return json(object);
}
