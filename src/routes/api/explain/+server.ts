import { OPENAI_API_KEY } from '$env/static/private';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText, type CoreMessage } from 'ai';

const openai = createOpenAI({
	apiKey: OPENAI_API_KEY
});

export async function POST({ request, url: { searchParams } }) {
	const { prompt } = await request.json();

	const targetlang = searchParams.get('tlang');
	const firstlang = searchParams.get('flang');

	const result = await streamText({
		model: openai('gpt-4o'),
		// @ts-ignore
		system: `Explain how to translate a given phrase into ${targetlang} with clear, concise steps with the request language`,
		messages: [
			{
				role: 'user',
				content: `Help me translate the phrase "${prompt}" into ${targetlang} and explain it to me in ${firstlang}`
			}
		],
		maxTokens: 500
	});

	return result.toDataStreamResponse();
}
