<script lang="ts">
	import { MapLibre, GeoJSON, CircleLayer, SymbolLayer, Popup } from 'svelte-maplibre';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Search, X, CheckCircle, AlertCircle, Calendar, MapPin } from '@lucide/svelte';

	interface Site {
		id: string;
		lng: number;
		lat: number;
		name: string;
		address: string;
		resistivity: number;
		lastTestDate: string;
		validated: boolean;
		hasImages: boolean;
		readingCount: number;
	}

	interface Props {
		sites?: Site[];
	}

	let { sites = [] }: Props = $props();

	const sydneyCenter: [number, number] = [151.2093, -33.8688];

	let searchQuery = $state('');
	let selectedSite = $state<Site | null>(null);
	let mapZoom = $state(10);
	let mapCenter = $state<[number, number]>(sydneyCenter);

	const searchResults = $derived(
		searchQuery.length > 1
			? sites.filter(
					(site) =>
						site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
						site.address.toLowerCase().includes(searchQuery.toLowerCase())
				)
			: []
	);

	function selectAddress(site: Site) {
		searchQuery = site.address;
		selectedSite = site;
		mapCenter = [site.lng, site.lat];
		mapZoom = 14;
	}

	function clearSearch() {
		searchQuery = '';
		selectedSite = null;
		mapZoom = 10;
		mapCenter = sydneyCenter;
	}

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
	}

	function getGeoJsonData() {
		return {
			type: 'FeatureCollection' as const,
			features: sites.map((site) => {
				const now = new Date();
				const testDate = new Date(site.lastTestDate);
				const monthsOld = (now.getTime() - testDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
				let ageCategory: number;
				if (monthsOld > 18)
					ageCategory = 2; // red
				else if (monthsOld >= 6)
					ageCategory = 1; // orange
				else ageCategory = 0; // green

				return {
					type: 'Feature' as const,
					geometry: {
						type: 'Point' as const,
						coordinates: [site.lng, site.lat]
					},
					properties: {
						name: site.name,
						resistivity: site.resistivity,
						address: site.address,
						lastTestDate: site.lastTestDate,
						validated: site.validated,
						hasImages: site.hasImages,
						readingCount: site.readingCount,
						id: site.id,
						ageCategory
					}
				};
			})
		};
	}

	function getSiteAgeColor(lastTestDate: string): string {
		const now = new Date();
		const testDate = new Date(lastTestDate);
		const monthsOld = (now.getTime() - testDate.getTime()) / (1000 * 60 * 60 * 24 * 30);

		if (monthsOld > 18) return '#ef4444'; // red - over 18 months
		if (monthsOld >= 6) return '#f97316'; // orange - 6-18 months
		return '#22c55e'; // green - less than 6 months
	}

	function getSiteAgeLabel(lastTestDate: string): string {
		const now = new Date();
		const testDate = new Date(lastTestDate);
		const monthsOld = (now.getTime() - testDate.getTime()) / (1000 * 60 * 60 * 24 * 30);

		if (monthsOld > 18) return `${Math.floor(monthsOld)} months old`;
		if (monthsOld >= 6) return `${Math.floor(monthsOld)} months old`;
		return 'Recent';
	}
</script>

<div class="w-full space-y-4">
	<div class="container mx-auto px-4">
		<div class="relative mx-auto max-w-xl">
			<div class="relative">
				<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					type="text"
					placeholder="Search for an address..."
					class="pr-10 pl-10"
					bind:value={searchQuery}
				/>
				{#if searchQuery}
					<button
						class="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
						onclick={clearSearch}
					>
						<X class="h-4 w-4" />
					</button>
				{/if}
			</div>

			{#if searchResults.length > 0}
				<div
					class="absolute z-50 mt-1 max-h-80 w-full overflow-auto rounded-lg border border-border/40 bg-background shadow-lg"
				>
					{#each searchResults.slice(0, 10) as site}
						<button
							class="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/50"
							onclick={() => selectAddress(site)}
						>
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full"
								style="background-color: {getSiteAgeColor(site.lastTestDate)}20"
							>
								<MapPin class="h-4 w-4" style="color: {getSiteAgeColor(site.lastTestDate)}" />
							</div>
							<div class="min-w-0 flex-1">
								<p class="truncate text-sm font-medium">{site.name}</p>
								<p class="truncate text-xs text-muted-foreground">{site.address}</p>
							</div>
							{#if site.validated}
								<CheckCircle class="h-4 w-4 text-green" />
							{:else}
								<AlertCircle class="h-4 w-4 text-orange" />
							{/if}
						</button>
					{/each}
					{#if searchResults.length > 10}
						<div
							class="border-t border-border/40 px-4 py-2 text-center text-xs text-muted-foreground"
						>
							{searchResults.length - 10} more results...
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<div class="relative h-[600px] w-full">
		<MapLibre
			bind:center={mapCenter}
			bind:zoom={mapZoom}
			class="h-full w-full"
			style="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
			standardControls
		>
			<GeoJSON
				data={getGeoJsonData()}
				cluster={{
					radius: 50,
					maxZoom: 14
				}}
			>
				<CircleLayer
					id="clusters"
					applyToClusters
					paint={{
						'circle-color': [
							'step',
							['get', 'point_count'],
							'#22c55e',
							10,
							'#f97316',
							30,
							'#ef4444'
						],
						'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 30, 40],
						'circle-stroke-width': 2,
						'circle-stroke-color': '#fff'
					}}
				>
					<SymbolLayer
						applyToClusters
						layout={{
							'text-field': ['get', 'point_count_abbreviated'],
							'text-size': 14
						}}
						paint={{
							'text-color': '#fff'
						}}
					/>
				</CircleLayer>

				<CircleLayer
					id="unclustered-points"
					applyToClusters={false}
					hoverCursor="pointer"
					paint={{
						'circle-color': ['step', ['get', 'ageCategory'], '#22c55e', 1, '#f97316', 2, '#ef4444'],
						'circle-radius': ['case', ['boolean', ['get', 'hasImages'], false], 12, 8],
						'circle-stroke-width': ['case', ['boolean', ['get', 'validated'], false], 3, 1],
						'circle-stroke-color': [
							'case',
							['boolean', ['get', 'validated'], false],
							'#22c55e',
							'#fff'
						]
					}}
				>
					<Popup openOn="click" closeOnClickInside={false}>
						{#snippet children({ data })}
							{#if data?.properties}
								{@const props = data.properties}
								<div class="min-w-[200px] p-2">
									<div class="mb-2 flex items-start justify-between gap-2">
										<h3 class="text-sm font-semibold">{props.name}</h3>
										{#if props.validated}
											<span
												class="inline-flex items-center gap-1 rounded-full bg-green/10 px-2 py-0.5 text-xs text-green"
											>
												<CheckCircle class="h-3 w-3" /> Validated
											</span>
										{:else}
											<span
												class="inline-flex items-center gap-1 rounded-full bg-orange/10 px-2 py-0.5 text-xs text-orange"
											>
												<AlertCircle class="h-3 w-3" /> Pending
											</span>
										{/if}
									</div>
									<p class="mb-2 text-xs text-muted-foreground">{props.address}</p>
									<div class="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
										<Calendar class="h-3 w-3" />
										Last test: {formatDate(props.lastTestDate)}
									</div>
									<div class="mb-3 flex items-center justify-between text-sm">
										<span class="text-muted-foreground">Resistivity:</span>
										<span
											class="font-semibold"
											style="color: {getSiteAgeColor(props.lastTestDate)}"
										>
											{props.resistivity.toFixed(1)} Ω·m
										</span>
									</div>
									<div class="mb-3 flex items-center justify-between text-xs text-muted-foreground">
										<span>{props.readingCount} readings</span>
										<span>{props.hasImages ? '📷 Has images' : 'No images'}</span>
									</div>
									<Button size="sm" href="/project/{props.id}" class="w-full text-xs">
										View Project
									</Button>
								</div>
							{/if}
						{/snippet}
					</Popup>
				</CircleLayer>
			</GeoJSON>
		</MapLibre>

		<div
			class="absolute top-4 right-4 z-10 w-64 rounded-lg border border-border/40 bg-background/90 px-4 py-3 backdrop-blur-sm"
		>
			<div class="mb-2 flex items-center justify-between">
				<p class="text-sm font-medium">{selectedSite ? 'Selected' : 'Sydney NSW'}</p>
				{#if selectedSite}
					<button onclick={clearSearch} class="text-xs text-purple hover:underline"> Clear </button>
				{/if}
			</div>
			<p class="text-2xl font-bold text-purple">{sites.length}</p>
			<p class="text-xs text-muted-foreground">test sites</p>

			<div class="mt-3 flex gap-3 border-t border-border/40 pt-3">
				<div class="flex items-center gap-1">
					<div class="h-2 w-2 rounded-full bg-green"></div>
					<span class="text-xs text-muted-foreground"
						>&lt;6 months: {sites.filter((s) => {
							const now = new Date();
							const testDate = new Date(s.lastTestDate);
							return (now.getTime() - testDate.getTime()) / (1000 * 60 * 60 * 24 * 30) < 6;
						}).length}</span
					>
				</div>
				<div class="flex items-center gap-1">
					<div class="h-2 w-2 rounded-full bg-orange"></div>
					<span class="text-xs text-muted-foreground"
						>6-18 months: {sites.filter((s) => {
							const now = new Date();
							const testDate = new Date(s.lastTestDate);
							const months = (now.getTime() - testDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
							return months >= 6 && months <= 18;
						}).length}</span
					>
				</div>
				<div class="flex items-center gap-1">
					<div class="h-2 w-2 rounded-full bg-red-500"></div>
					<span class="text-xs text-muted-foreground"
						>&gt;18 months: {sites.filter((s) => {
							const now = new Date();
							const testDate = new Date(s.lastTestDate);
							return (now.getTime() - testDate.getTime()) / (1000 * 60 * 60 * 24 * 30) > 18;
						}).length}</span
					>
				</div>
			</div>
		</div>
	</div>
</div>
