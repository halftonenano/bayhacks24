// async function main(audio: any) {
//   const transcription = await openai.audio.transcriptions.create({
//     file: audio,
//     model: "whisper-1",
//     response_format: "text",
//   });

import { openai } from '$lib/openai.js';
import { error, json } from '@sveltejs/kit';

//   console.log(transcription.text);
// }
// main();

export async function POST({ request }) {
	console.log(request);

	const audiofile = (await request.formData()).get('file') as File | undefined;

	if (!audiofile) return json({ error: 'no file.' }, { status: 500 });

	const transcription = await openai.audio.transcriptions.create({
		file: audiofile,
		model: 'whisper-1',
		response_format: 'text'
	});

	return json({ transcription });
}
