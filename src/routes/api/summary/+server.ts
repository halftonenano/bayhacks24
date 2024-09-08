import { OPENAI_API_KEY } from '$env/static/private';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText, type CoreMessage } from 'ai';

const openai = createOpenAI({
	apiKey: OPENAI_API_KEY
});

export async function POST({ request, url: {searchParams} }) {
	const { prompt } = await request.json();

	const firstlang = searchParams.get('flang');

	const result = await streamText({
		model: openai('gpt-4o-mini'),
		// @ts-ignore
		system: `Summarize the transcript of a conversation, and do so in ${firstlang}.`,
		prompt: `Please summarize this conversation: "${prompt}"`,
		maxTokens: 500
	});

	return result.toDataStreamResponse();
}
