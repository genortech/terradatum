<script lang="ts">
	import { MapLibre, GeoJSON, CircleLayer, Popup } from 'svelte-maplibre';
	import type { LayerClickInfo } from 'svelte-maplibre';
	import { Button } from '$lib/components/ui/button';
	import { getSites, getNewSiteId, clearNewSiteId, type Site } from '$lib/data/site-store';
	import MapSearch from '$lib/components/map-search.svelte';
	import MapControls from '$lib/components/map-controls.svelte';
	import MapStats from '$lib/components/map-stats.svelte';
	import { CheckCircle, AlertCircle, Calendar } from '@lucide/svelte';
	import { onMount } from 'svelte';

	const sydneyCenter: [number, number] = [151.2093, -33.8688];

	let sites = $state<Site[]>(getSites());
	let selectedSite = $state<Site | null>(null);
	let mapZoom = $state(12);
	let mapCenter = $state<[number, number]>(sydneyCenter);
	let flashingSiteId = $state<string | null>(null);

	onMount(() => {
		const interval = setInterval(() => {
			const currentSites = getSites();
			const newId = getNewSiteId();

			if (newId && newId !== flashingSiteId) {
				flashingSiteId = newId;

				setTimeout(() => {
					clearNewSiteId();
					flashingSiteId = null;
				}, 5000);
			}

			sites = currentSites;
		}, 5000);

		return () => clearInterval(interval);
	});

	function selectSite(site: Site) {
		selectedSite = site;
		mapCenter = [site.lng, site.lat];
		mapZoom = 16;
	}

	function clearSearch() {
		selectedSite = null;
		mapZoom = 12;
		mapCenter = sydneyCenter;
	}

	function zoomIn() {
		mapZoom = Math.min(mapZoom + 1, 20);
	}

	function zoomOut() {
		mapZoom = Math.max(mapZoom - 1, 1);
	}

	function getAgeColor(lastTestDate: string): string {
		const months = (Date.now() - new Date(lastTestDate).getTime()) / (1000 * 60 * 60 * 24 * 30);
		if (months > 18) return '#ef4444';
		if (months >= 6) return '#f97316';
		return '#22c55e';
	}

	function getAgeLabel(lastTestDate: string): string {
		const months = (Date.now() - new Date(lastTestDate).getTime()) / (1000 * 60 * 60 * 24 * 30);
		if (months > 18) return `${Math.floor(months)} months old`;
		if (months >= 6) return `${Math.floor(months)} months old`;
		return 'Recent';
	}

	function getGeoJson() {
		return {
			type: 'FeatureCollection' as const,
			features: sites.map((site) => {
				const months =
					(Date.now() - new Date(site.lastTestDate).getTime()) / (1000 * 60 * 60 * 24 * 30);
				const ageCategory = months > 18 ? 2 : months >= 6 ? 1 : 0;
				const isNew = site.id === flashingSiteId;
				return {
					type: 'Feature' as const,
					geometry: { type: 'Point' as const, coordinates: [site.lng, site.lat] },
					properties: { ...site, ageCategory, isNew }
				};
			})
		};
	}

	function handleMarkerClick(e: LayerClickInfo) {
		const props = e.features?.[0]?.properties;
		if (props) {
			selectedSite = sites.find((s) => s.id === props.id) || null;
		}
	}
</script>

<svelte:head>
	<title>Map - Terradatum</title>
</svelte:head>

<div class="flex h-[calc(100vh-4rem)] flex-col">
	<MapSearch {sites} onSelect={selectSite} />

	<div class="relative flex-1">
		<MapLibre
			bind:center={mapCenter}
			bind:zoom={mapZoom}
			class="h-full w-full"
			style="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
			standardControls={false}
		>
			<GeoJSON data={getGeoJson()} cluster={{ radius: 60, maxZoom: 14 }}>
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
						'circle-radius': ['step', ['get', 'point_count'], 25, 10, 35, 30, 50],
						'circle-stroke-width': 3,
						'circle-stroke-color': '#fff'
					}}
				/>

				<CircleLayer
					id="new-site-pulse"
					applyToClusters={false}
					filter={['==', ['get', 'isNew'], true]}
					paint={{
						'circle-color': '#a855f7',
						'circle-radius': 20,
						'circle-stroke-width': 4,
						'circle-stroke-color': '#a855f7',
						'circle-opacity': 0.6
					}}
				/>

				<CircleLayer
					id="unclustered-points"
					applyToClusters={false}
					hoverCursor="pointer"
					paint={{
						'circle-color': ['step', ['get', 'ageCategory'], '#22c55e', 1, '#f97316', 2, '#ef4444'],
						'circle-radius': ['case', ['boolean', ['get', 'hasImages'], false], 14, 10],
						'circle-stroke-width': ['case', ['boolean', ['get', 'validated'], false], 4, 2],
						'circle-stroke-color': [
							'case',
							['boolean', ['get', 'validated'], false],
							'#22c55e',
							'#fff'
						]
					}}
					onclick={handleMarkerClick}
				>
					{#if selectedSite}
						{@const site = selectedSite}
						<Popup
							openOn="click"
							closeOnClickInside={false}
							lngLat={{ lng: site.lng, lat: site.lat }}
						>
							{#snippet children()}
								<div class="min-w-[250px] p-3">
									<div class="mb-2 flex items-start justify-between gap-2">
										<h3 class="font-semibold">{site.name}</h3>
										{#if site.validated}
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
									<p class="mb-2 text-sm text-muted-foreground">{site.address}</p>
									<div class="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
										<Calendar class="h-4 w-4" />
										{getAgeLabel(site.lastTestDate)}
									</div>
									<div class="mb-3 flex items-center justify-between text-sm">
										<span class="text-muted-foreground">Resistivity:</span>
										<span class="font-semibold" style="color: {getAgeColor(site.lastTestDate)}">
											{site.resistivity.toFixed(1)} Ω·m
										</span>
									</div>
									<div class="mb-3 flex items-center justify-between text-sm text-muted-foreground">
										<span>{site.readingCount} readings</span>
										<span>{site.hasImages ? 'Images' : 'No images'}</span>
									</div>
									<Button size="sm" href="/project/{site.id}" class="w-full">View Project</Button>
								</div>
							{/snippet}
						</Popup>
					{/if}
				</CircleLayer>
			</GeoJSON>
		</MapLibre>

		<MapControls onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={clearSearch} />
		<MapStats {sites} />
	</div>
</div>
