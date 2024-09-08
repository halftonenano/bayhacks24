<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { preferences } from '$lib/preferences';
	import { useCompletion } from '@ai-sdk/svelte';
	import ky from 'ky';
	import { marked } from 'marked';

	const { completion, complete } = useCompletion({
		api: `/api/explain?tlang=${$preferences.targetLanguage}&flang=${$preferences.firstLanguage}`
	});
	const { completion: completion2, complete: complete2 } = useCompletion({
		api: `/api/summary?flang=${$preferences.firstLanguage}`
	});
	let helpView: number = 0;
	let dictionaryWord: string = '';
	let translatedWord: string = '';

	let explainedPhrase: string = '';

	function handleSummary() {
		complete2(transcript);
	}

	let summary: string = 'summary should go here';

	let explainInput = '';

	export let transcript: string = '';
</script>

<div class="flex flex-col gap-4 p-4">
	<div class="flex gap-4 border-b-2 border-emerald-500 pb-3">
		<Button
			variant="outline"
			on:click={() => {
				helpView = 0;
			}}
			>Dictionary
		</Button>
		<Button
			variant="outline"
			on:click={() => {
				helpView = 1;
			}}
		>
			Explain
		</Button>
		<Button
			variant="outline"
			on:click={() => {
				helpView = 2;
			}}
		>
			Summary
		</Button>
	</div>
	{#if helpView == 0}
		<div class="flex h-32 w-full gap-4">
			<div class="flex w-full justify-between gap-4">
				<div class="flex w-[40%] flex-col gap-4">
					<input
						class="rounded-md border px-3 py-2 focus:outline-none"
						bind:value={dictionaryWord}
						placeholder="Enter your word here!"
					/>
					<Button
						class=""
						on:click={async () => {
							const data = await ky
								.get(`https://lingva.ml/api/v1/auto/en/${encodeURIComponent(dictionaryWord)}`)
								.json();
							// @ts-ignore
							translatedWord = data.translation;
						}}>Translate</Button
					>
				</div>
				<div class="w-[60%] rounded-md bg-white bg-opacity-50 p-2">
					{#if translatedWord}
						{translatedWord}
					{:else}
						Your translation will appear here!
					{/if}
				</div>
			</div>
		</div>
	{:else if helpView == 1}
		<div class="">
			<div class="flex place-items-center gap-2">
				<div class="-mr-2 w-32">How to say...</div>
				<form
					on:submit|preventDefault={() => {
						complete(explainInput);
					}}
				>
					<input
						class="w-full rounded-md border p-2"
						bind:value={explainInput}
						placeholder="Enter a phrase here!"
					/>
				</form>
			</div>

			<div class="prose">
				{@html marked($completion)}
			</div>
		</div>
	{:else}
		<Button
			on:click={() => {
				handleSummary();
			}}>Request a Summary</Button
		>
		{$completion2}
	{/if}
</div>
