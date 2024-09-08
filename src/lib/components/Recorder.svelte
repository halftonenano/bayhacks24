<script lang="ts">
	import { Button } from './ui/button';

	export let audioFile: Blob | null;
	let mediaRecorder: MediaRecorder;
	let audioChunks: Blob[] = [];
	export let isRecording = false;

	async function startRecording() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorder = new MediaRecorder(stream);

			mediaRecorder.ondataavailable = (event) => {
				audioChunks.push(event.data);
			};

			mediaRecorder.onstop = () => {
				audioFile = new Blob(audioChunks, { type: 'audio/ogg' });
				audioChunks = [];
			};

			mediaRecorder.start();
			isRecording = true;
		} catch (err) {
			console.error('Error accessing microphone:', err);
		}
	}

	function stopRecording() {
		mediaRecorder.stop();
		isRecording = false;
	}

	function handleRecording() {
		if (isRecording) {
			stopRecording();
		} else {
			startRecording();
		}
	}
</script>

<Button {...$$restProps} variant="outline" on:click={handleRecording}>
	{isRecording ? 'Stop Recording' : 'Start Recording'}
</Button>
