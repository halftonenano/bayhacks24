<script lang="ts">
	import { levels } from '$lib/levels';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
  import Settings from '$lib/components/Settings.svelte';
  
  import { preferences } from '$lib/preferences'; // Import the store
  import { get } from 'svelte/store'; // For accessing the initial value
  let { firstLanguage } = get(preferences);
  
  let spanish:boolean = false
  if (firstLanguage == "Spanish"){
    spanish=true
  }
  

	let hovered = '';
	$: selectedLevel = levels.find(l => l.id === hovered) || null;

  let difficulty = 1;

  let difficulties = ["", "easy", "medium", "hard"];
</script>

<div class="grid w-full grid-cols-5 h-[100vh]">
	<div class="col-span-3 flex w-full flex-col gap-4 p-4 overflow-y-scroll">
		<div class="text-6xl font-bold p-4">
      OmniLingual
      <span class="text-2xl text-neutral-500">For BayHacks</span>
    </div>

    {#each levels as level (level.id)}
			<a href="/levels/{level.id}/{difficulties[difficulty]}" on:mouseenter={() => (hovered = level.id)}>
				<div class={cn('rounded-lg border shadow-lg px-5 py-12 mr-48 transition-all duration-500 ease-in-out', hovered === level.id && 'bg-blue-500 text-white font-bold mr-0')}>
					{#if spanish}
            {level.spanish_name}
          {:else}
            {level.name}
          {/if}
				</div>
			</a>
		{/each}
	</div>

	<div class="col-span-2 h-full bg-gradient-to-r from-white to-blue-200 grid place-items-center">
		{#if selectedLevel}
      <div class="flex flex-col">
        <div class="text-3xl font-bold">
          {#if spanish}
            {selectedLevel.spanish_name}
          {:else}
            {selectedLevel.name}
          {/if}
        </div>
        <div class="text-md text-neutral-700 w-96">
          {#if spanish}
            {selectedLevel.spanish_description}
          {:else}
            {selectedLevel.description}
          {/if}
        </div>
        
        <div class="w-96 rounded-lg shadow-lg bg-white flex flex-col place-items-center p-8 gap-4">
          <div class="w-64 aspect-square rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 shadow-md">
          </div>
          <div class="flex justify-between w-64">
            <button on:click={()=>{difficulty=1}} class={`p-2 rounded-md border-2 border-emerald-400 transition-all duration-500 ${difficulty==1 ? "bg-emerald-400 text-emerald-800" : "bg-transparent text-emerald-400"}`}>
              
              Easy
              {#if spanish}
                Fácil
              {:else}
                Easy
              {/if}
            </button>
            <button on:click={()=>{difficulty=2}} class={`p-2 rounded-md border-2 border-amber-400 transition-all duration-500 ${difficulty==2 ? "bg-amber-400 text-amber-800" : "bg-transparent text-amber-400"}`}>
              {#if spanish}
                Medio
              {:else}
                Medium
              {/if}
            </button>
            <button on:click={()=>{difficulty=3}} class={`p-2 rounded-md border-2 border-rose-400 transition-all duration-500 ${difficulty==3 ? "bg-rose-400 text-rose-800" : "bg-transparent text-rose-400"}`}>
              {#if spanish}
                Difícil
              {:else}
                Hard
              {/if}
            </button>
          </div>
          <a href="/levels/{selectedLevel.id}/{difficulties[difficulty]}" class="p-2 w-64 bg-gradient-to-tr from-blue-500 to-blue-700 rounded-md shadow-md text-center text-white font-bold">
            
            Jump In!
          </a>

        </div>
      </div>
		{/if}
	</div>
</div>

<div class="absolute top-8 right-8">
  <Settings/>
</div>