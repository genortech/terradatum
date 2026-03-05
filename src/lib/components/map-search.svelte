<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Search, X, MapPin, CheckCircle, AlertCircle } from '@lucide/svelte';
	import type { Site } from '$lib/data/sites';

	interface Props {
		sites: Site[];
		onSelect: (site: Site) => void;
	}

	let { sites, onSelect }: Props = $props();

	let searchQuery = $state('');

	const searchResults = $derived(
		searchQuery.length > 1
			? sites.filter(
					(site) =>
						site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
						site.address.toLowerCase().includes(searchQuery.toLowerCase())
				)
			: []
	);

	function getSiteAgeColor(lastTestDate: string): string {
		const now = new Date();
		const testDate = new Date(lastTestDate);
		const monthsOld = (now.getTime() - testDate.getTime()) / (1000 * 60 * 60 * 24 * 30);

		if (monthsOld > 18) return '#ef4444';
		if (monthsOld >= 6) return '#f97316';
		return '#22c55e';
	}

	function clearSearch() {
		searchQuery = '';
	}
</script>

<div class="relative border-b border-border/40 bg-background p-4">
	<div class="mx-auto max-w-3xl">
		<div class="relative">
			<Search class="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
			<Input
				type="text"
				placeholder="Search for an address in Sydney..."
				class="h-14 border-2 border-transparent bg-muted/50 pr-12 pl-12 text-lg focus:border-purple"
				bind:value={searchQuery}
			/>
			{#if searchQuery}
				<button
					class="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					onclick={clearSearch}
				>
					<X class="h-5 w-5" />
				</button>
			{/if}
		</div>

		{#if searchResults.length > 0}
			<div
				class="absolute right-0 left-0 z-50 mx-auto mt-2 max-h-80 max-w-3xl overflow-auto rounded-lg border border-border/40 bg-background shadow-xl"
			>
				{#each searchResults.slice(0, 10) as site}
					<button
						class="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-muted/50"
						onclick={() => onSelect(site)}
					>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full"
							style="background-color: {getSiteAgeColor(site.lastTestDate)}20"
						>
							<MapPin class="h-5 w-5" style="color: {getSiteAgeColor(site.lastTestDate)}" />
						</div>
						<div class="min-w-0 flex-1">
							<p class="truncate font-medium">{site.name}</p>
							<p class="truncate text-sm text-muted-foreground">{site.address}</p>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-sm font-medium" style="color: {getSiteAgeColor(site.lastTestDate)}">
								{site.resistivity.toFixed(1)} Ω·m
							</span>
							{#if site.validated}
								<CheckCircle class="h-4 w-4 text-green" />
							{:else}
								<AlertCircle class="h-4 w-4 text-orange" />
							{/if}
						</div>
					</button>
				{/each}
				{#if searchResults.length > 10}
					<div
						class="border-t border-border/40 px-4 py-2 text-center text-sm text-muted-foreground"
					>
						{searchResults.length - 10} more results...
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
