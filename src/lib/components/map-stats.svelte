<script lang="ts">
	import type { Site } from '$lib/data/sites';

	interface Props {
		sites: Site[];
	}

	let { sites }: Props = $props();

	function getCounts() {
		const now = new Date();
		const recent = sites.filter((s) => {
			const months =
				(now.getTime() - new Date(s.lastTestDate).getTime()) / (1000 * 60 * 60 * 24 * 30);
			return months < 6;
		}).length;

		const medium = sites.filter((s) => {
			const months =
				(now.getTime() - new Date(s.lastTestDate).getTime()) / (1000 * 60 * 60 * 24 * 30);
			return months >= 6 && months <= 18;
		}).length;

		const old = sites.filter((s) => {
			const months =
				(now.getTime() - new Date(s.lastTestDate).getTime()) / (1000 * 60 * 60 * 24 * 30);
			return months > 18;
		}).length;

		return { recent, medium, old };
	}

	let counts = $derived(getCounts());
</script>

<div
	class="absolute bottom-4 left-4 z-10 rounded-lg border border-border/40 bg-background/90 px-4 py-3 backdrop-blur-sm"
>
	<div class="flex items-center gap-6">
		<div>
			<p class="text-2xl font-bold text-purple">{sites.length}</p>
			<p class="text-xs text-muted-foreground">Total Sites</p>
		</div>
		<div class="flex items-center gap-1">
			<div class="h-3 w-3 rounded-full bg-green-500"></div>
			<span class="text-sm">{counts.recent} &lt;6mo</span>
		</div>
		<div class="flex items-center gap-1">
			<div class="h-3 w-3 rounded-full bg-orange-500"></div>
			<span class="text-sm">{counts.medium} 6-18mo</span>
		</div>
		<div class="flex items-center gap-1">
			<div class="h-3 w-3 rounded-full bg-red-500"></div>
			<span class="text-sm">{counts.old} &gt;18mo</span>
		</div>
	</div>
</div>
