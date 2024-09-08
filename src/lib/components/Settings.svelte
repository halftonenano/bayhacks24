<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Check from 'lucide-svelte/icons/check';
	import Settings from 'lucide-svelte/icons/settings';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { tick } from 'svelte';
	import { preferences } from '$lib/preferences'; // Import the store
	import { get } from 'svelte/store'; // For accessing the initial value

	// Full list of languages for other selections
	const languages = [
		{ value: 'english', label: 'English' },
		{ value: 'spanish', label: 'Spanish' },
		{ value: 'french', label: 'French' },
		{ value: 'mandarin', label: 'Mandarin' },
		{ value: 'arabic', label: 'Arabic' },
		{ value: 'hindi', label: 'Hindi' },
		{ value: 'japanese', label: 'Japanese' },
		{ value: 'bulgarian', label: 'Bulgarian' }
	];

	// Only English and Spanish allowed for the first language
	const languagesFirstLanguage = languages.filter(
		(lang) => lang.value === 'english' || lang.value === 'spanish'
	);

	// Retrieve the initial values from the store
	let { firstLanguage, targetLanguage } = get(preferences);

	let open = false;
	let value = firstLanguage.toLowerCase(); // Initialize value from the store

	$: selectedValue =
		languagesFirstLanguage.find((f) => f.value === value)?.label ?? 'Select a language...';

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	let open2 = false;
	let value2 = targetLanguage.toLowerCase(); // Initialize value from the store

	$: selectedValue2 = languages.find((f) => f.value === value2)?.label ?? 'Select a language...';

	function closeAndFocusTrigger2(triggerId: string) {
		open2 = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	// Update store when a new language is selected
	function updatePreferences() {
		preferences.update((p) => ({
			...p,
			firstLanguage:
				languagesFirstLanguage.find((f) => f.value === value)?.label || p.firstLanguage,
			targetLanguage: languages.find((f) => f.value === value2)?.label || p.targetLanguage
		}));
	}
</script>

<Dialog.Root>
	<Dialog.Trigger
		class="flex items-center gap-1.5 rounded-md border bg-white px-2 py-1 text-sm font-medium"
		><Settings size={18} /> Open Settings</Dialog.Trigger
	>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Settings Tab</Dialog.Title>
			<Dialog.Description>Augment your Language Preferences Here!</Dialog.Description>
		</Dialog.Header>
		<div class="flex flex-col gap-4">
			<div class="flex place-items-center gap-2">
				Native Language:
				<Popover.Root bind:open let:ids>
					<Popover.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							variant="outline"
							role="combobox"
							aria-expanded={open}
							class="w-[200px] justify-between"
						>
							{selectedValue}
							<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</Popover.Trigger>
					<Popover.Content class="w-[200px] p-0">
						<Command.Root>
							<Command.Input placeholder="Search language..." />
							<Command.Empty>No language found.</Command.Empty>
							<Command.Group>
								{#each languagesFirstLanguage as language}
									<Command.Item
										value={language.value}
										onSelect={(currentValue) => {
											value = currentValue;
											closeAndFocusTrigger(ids.trigger);
											updatePreferences(); // Update the store when a language is selected
										}}
									>
										<Check
											class={cn('mr-2 h-4 w-4', value !== language.value && 'text-transparent')}
										/>
										{language.label}
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
			</div>

			<div class="flex place-items-center gap-2">
				Target Language:
				<Popover.Root bind:open={open2} let:ids>
					<Popover.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							variant="outline"
							role="combobox"
							aria-expanded={open2}
							class="w-[200px] justify-between"
						>
							{selectedValue2}
							<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</Popover.Trigger>
					<Popover.Content class="w-[200px] p-0">
						<Command.Root>
							<Command.Input placeholder="Search language..." />
							<Command.Empty>No language found.</Command.Empty>
							<Command.Group>
								{#each languages as language}
									<Command.Item
										value={language.value}
										onSelect={(currentValue) => {
											value2 = currentValue;
											closeAndFocusTrigger2(ids.trigger);
											updatePreferences(); // Update the store when a language is selected
										}}
									>
										<Check
											class={cn('mr-2 h-4 w-4', value2 !== language.value && 'text-transparent')}
										/>
										{language.label}
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
			</div>
      <div>
        
      </div>

		</div>
	</Dialog.Content>
</Dialog.Root>
