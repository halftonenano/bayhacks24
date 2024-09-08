<script lang="ts">
	import { useChat, useCompletion } from '@ai-sdk/svelte';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { marked } from 'marked';
	import { cn } from '$lib/utils';
	import Recorder from '$lib/components/Recorder.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ky from 'ky';
	import HelpDesk from '$lib/components/HelpDesk.svelte';
	import { nanoid } from 'nanoid';
	import { onMount } from 'svelte';
	import { preferences } from '$lib/preferences.js';
	import { page } from '$app/stores';
	// import { Mic, Type } from 'lucide-svelte';

	export let data;

	let initializing = true;

	let helpDesk = false;
	const { input, handleSubmit, messages, isLoading, setMessages } = useChat({
		api: `/api/chat?level=${data.level.id}&flang=${$preferences.firstLanguage}&tlang=${$preferences.targetLanguage}&difficulty=${$page.params.difficulty}`
	});

	onMount(async () => {
		setMessages([
			{
				id: 'x',
				role: 'assistant',
				content: (
					await ky
						.post(`/api/translate?lang=${$preferences.targetLanguage}`, {
							json: { prompt: data.level.starting_message }
						})
						.json<{ translation: string }>()
				).translation
			}
		]);
		initializing = false;
		console.log('Difficulty level:', $page.params.difficulty);
	});

	$: difficulty = $page.params.difficulty;

	let audioFile: Blob | null = null;
	let isRecording = false;

	let audioFiles: { [id: string]: { url: string; file: Blob } } = {};
	let transcript: string = '';

	// function testing() {
	// 	const thing = $messages
	// 		.map((message) => {
	// 			return `${message.role === 'user' ? 'User' : 'You'}: ${message.content}`;
	// 		})
	// 		.join('\n');

	// 	transcript = thing;
	// }

	$: {
		transcript = $messages
			.map((message) => {
				return `${message.role === 'user' ? 'User' : 'Character'}: ${message.content}'\n'`;
			})
			.join('\n');
	}

	let voicemode = true;

	let turns = 0;
	let over = false;

	let grade;
	let grading = false;
	$: if (turns >= 5 && !grading) {
		over = true;
		grading = true;
		(async () => {
			grade = await ky.post('/api/grade', { json: { prompt: transcript } }).json();
			console.log(grade);
		})();
	}

	let showTranscript = false;
	let showFeedback = false;
	let feedback: string = '';

	const { completion, complete } = useCompletion({ api: '/api/feedback' });
	let feedbackthingy: number = 0;
	$: {
		if (feedbackthingy == 1) {
			complete(transcript);
		}
	}
</script>

<Button class="fixed left-5 top-5 z-40" href="/levels">← Back</Button>

<div class="grid h-screen overflow-x-hidden">
	<div
		class="relative grid w-full border-b bg-gradient-to-tr from-transparent to-blue-200 shadow-inner"
	>
		<div
			class="relative flex h-[60vh] flex-col-reverse gap-6 overflow-x-hidden overflow-y-scroll p-10 transition-all duration-500 ease-in-out"
		>
			{#if initializing}
				Initializing...
			{/if}
			{#each $messages.toReversed() as message (message.id)}
				{@const audioRegex = /^(\<\[audio\-message:([A-z\d\-_]+)\]\>)(.+)$/m.exec(message.content)}
				<li
					class={cn('flex items-end gap-5', message.role !== 'user' && 'flex-row-reverse')}
					in:fly={{ delay: 250, duration: 300, x: 0, y: 500, opacity: 0.5, easing: quintOut }}
				>
					<div
						class={cn(
							'grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border bg-white p-2 shadow-lg'
							// message.role === 'user' ? 'border-blue-500' : 'border-red-500'
						)}
					>
						<img
							class="h-[120%]"
							src={message.role === 'user'
								? '/assets/characters/blue.png'
								: '/assets/characters/orange.png'}
							alt=""
						/>
					</div>
					<div>
						{#if audioRegex}
							<audio class="origin-left scale-75" src={audioFiles[audioRegex[2]].url} controls />
						{/if}
						<div
							class={cn(
								'prose list-none rounded-xl border bg-white px-5 py-3 shadow-lg',
								message.role === 'user'
									? // ? 'mr-40 rounded-bl-none border-blue-500'
										// : 'ml-40 rounded-br-none border-red-500'
										'mr-40 rounded-bl-none'
									: 'ml-40 rounded-br-none'
							)}
						>
							{#if audioRegex}
								{@html marked.parse(audioRegex[3])}
							{:else}
								{@html marked.parse(message.content)}
							{/if}
						</div>
					</div>
				</li>
			{/each}
			<div class="h-72"></div>
		</div>

		{#if helpDesk}
			<div
				transition:fly={{ duration: 300, y: 300, opacity: 0, easing: quintOut }}
				class="mx-auto max-w-4xl rounded-md border bg-white shadow-lg fixed bottom-0 left-[50%] translate-x-[-50%]"
			>
				<HelpDesk {transcript} />
				<button
					on:click={() => {
						helpDesk = false;
					}}
					class="w-full bg-emerald-500 p-1 text-center font-bold text-white"
				>
					Close Help Desk
				</button>
			</div>
		{/if}
	</div>

	<div class="flex items-end justify-between">
		<div class="flex items-start gap-5">
			<img
				class={cn('-mr-[10%] h-[40vh]', isRecording && 'animate-bounce')}
				src="/assets/characters/blue.png"
				alt="blue guy"
			/>

			<div
				transition:fly={{ delay: 50, duration: 50, x: 0, y: 500, opacity: 0.5, easing: quintOut }}
				class=""
			>
				<div class="mb-2 flex w-fit items-center gap-1.5 rounded-full border p-1.5 shadow-lg">
					<button
						class="flex shrink-0 items-center gap-1 rounded-full bg-blue-500 px-2 py-1 text-sm font-bold text-white"
						on:click={() => (voicemode = !voicemode)}
					>
						{#if voicemode}
							<!-- <Mic size={18} /> -->
							Voice Mode
						{:else}
							<!-- <Type size={18} /> -->
							Text Mode
						{/if}
					</button>
					<button
						class="flex shrink-0 items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-sm font-bold text-white"
						on:click={() => (helpDesk = !helpDesk)}
					>
						Toggle Help Desk
					</button>
				</div>
				{#if voicemode}
					<Recorder bind:audioFile bind:isRecording />
					{#if audioFile}
						<div class="mt-3 flex items-center gap-3">
							{#key audioFile}
							<audio controls src={URL.createObjectURL(audioFile)} />
							{/key}
							<Button
								on:click={async () => {
									if (!audioFile) return;

									const formData = new FormData();
									formData.append('file', audioFile || '');

									const data = await fetch('/api/stt', { method: 'POST', body: formData }).then(
										(r) => r.json()
									);

									const audioid = nanoid();

									audioFiles[audioid] = { url: URL.createObjectURL(audioFile), file: audioFile };
									audioFiles = audioFiles;

									$input = `<[audio-message:${audioid}]>${data.transcription}`;
									turns += 1;
									handleSubmit();
								}}
							>
								Send
							</Button>
						</div>
					{/if}
				{:else}
					<div>
						<form
							on:submit|preventDefault={() => {
								turns += 1;
								handleSubmit();
							}}
						>
							<input
								class="relative z-40 w-full min-w-96 rounded-full border bg-white px-4 py-2 text-sm shadow-lg focus:outline-none"
								placeholder="Type your message..."
								bind:value={$input}
							/>
						</form>
					</div>
				{/if}
			</div>
		</div>

		<div class="shrink-0 scale-x-[-1]">
			<img
				class={cn('pointer-events-none -z-30 h-[40vh] scale-[90%]', $isLoading && 'animate-bounce')}
				src="/assets/characters/orange.png"
				alt="orange guy"
			/>
		</div>
	</div>
</div>

{#if over}
	<div
		transition:fade={{ delay: 300, duration: 700, easing: quintOut }}
		class="fixed inset-0 z-[99] grid place-items-center bg-opacity-50 backdrop-blur-md"
	>
		<div
			class="flex h-96 w-[36rem] flex-col place-items-center gap-8 rounded-lg border-2 border-black bg-white p-4 shadow-xl"
		>
			<div class="text-4xl font-bold">Level Completed!</div>
			<div class="flex place-items-center gap-4">
				{#if grade}
					<div>Your final grade is: {grade?.grades.letter_grade}</div>
					<div>Grammer: {grade?.grades.grammer}</div>
					<div>Vocab: {grade?.grades.vocab}</div>
				{/if}
			</div>
			<button
				on:click={() => {
					showTranscript = !showTranscript;
					feedbackthingy = 1;
				}}
				class="w-full rounded-md border-2 border-amber-300 bg-amber-200 p-2 text-amber-800 shadow-md"
			>
				View Transcript
			</button>
			<button
				on:click={() => {
					showFeedback = !showFeedback;
				}}
				class="w-full rounded-md border-2 border-violet-300 bg-violet-200 p-2 text-violet-800 shadow-md"
			>
				View Feedback
			</button>
			<a
				href="/levels"
				class="w-full rounded-md bg-black p-2 text-center font-bold text-white shadow-md"
			>
				Return to Levels
			</a>
		</div>
	</div>
{/if}

{#if showTranscript}
	<div
		class="absolute left-0 top-[50%] z-[999] h-[80vh] w-80 -translate-y-[50%] rounded-r-md border-2 border-l-0 border-amber-300 bg-amber-200 p-4 text-amber-800"
	>
		{transcript}
	</div>
{/if}
{#if showFeedback}
	<div
		class="prose absolute right-0 top-[50%] z-[999] h-[80vh] w-80 -translate-y-[50%] overflow-y-scroll rounded-l-md border-2 border-r-0 border-violet-300 bg-violet-200 p-4 text-violet-800"
	>
		{#if $completion}
			{@html marked($completion)}
		{:else}
			Loading...
		{/if}
	</div>
{/if}
