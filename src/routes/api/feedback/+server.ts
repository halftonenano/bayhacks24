import { OPENAI_API_KEY } from '$env/static/private';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText, type CoreMessage } from 'ai';

const openai = createOpenAI({
	apiKey: OPENAI_API_KEY
});

export async function POST({ request }) {
	const { prompt } = await request.json();

	const result = await streamText({
		model: openai('gpt-4o-mini'),
		// @ts-ignore
		system: 'You are to assume the role of a language teacher, and provide feedback, both positive and negative, based off of a transcript between a user and a practice character. The user is who you are providing feedback to.',
		prompt: `Here is the transcript of a conversation: "${prompt}"`,
		maxTokens: 350
	});

	return result.toDataStreamResponse();
}
