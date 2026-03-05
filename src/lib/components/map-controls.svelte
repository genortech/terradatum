<script lang="ts">
	import { ZoomIn, ZoomOut, Locate } from '@lucide/svelte';

	interface Props {
		onZoomIn: () => void;
		onZoomOut: () => void;
		onReset: () => void;
	}

	let { onZoomIn, onZoomOut, onReset }: Props = $props();
</script>

<div class="absolute top-4 right-4 z-10 flex flex-col gap-2">
	<button
		onclick={onZoomIn}
		class="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background shadow-md hover:bg-muted"
	>
		<ZoomIn class="h-5 w-5" />
	</button>
	<button
		onclick={onZoomOut}
		class="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background shadow-md hover:bg-muted"
	>
		<ZoomOut class="h-5 w-5" />
	</button>
	<button
		onclick={onReset}
		class="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background shadow-md hover:bg-muted"
	>
		<Locate class="h-5 w-5" />
	</button>
</div>
