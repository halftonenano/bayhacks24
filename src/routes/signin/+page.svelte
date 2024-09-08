<script>
	import { Button } from '$lib/components/ui/button';
	import { pb } from '$lib/pocketbase';

	async function oAuth() {
		await pb.collection('users').authWithOAuth2({ provider: 'google' });
	}
</script>

<div class="grid min-h-screen place-items-center">
	<Button
		class="flex gap-2"
		on:click={() => {
			oAuth();
		}}
		variant="outline"
	>
		<img class="w-5" src="/assets/google.png" alt="google logo" />
		Continue with Google
	</Button>
</div>
