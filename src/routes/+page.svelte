<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import MapPreview from '$lib/components/map-preview.svelte';
	import { MapPin, Upload, Database, BarChart3, Zap, Shield, ChevronRight } from '@lucide/svelte';
	import { getSites, type Site } from '$lib/data/site-store';
	import { onMount } from 'svelte';

	let sites = $state<Site[]>(getSites());

	onMount(() => {
		const interval = setInterval(() => {
			sites = getSites();
		}, 5000);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Terradatum - Earth Resistivity Data Repository</title>
	<meta
		name="description"
		content="Store and visualize Wenner 4-pole earth resistance measurements. Map-based data repository for electrical engineers and earthing professionals."
	/>
</svelte:head>

<div class="relative overflow-hidden">
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 bg-gradient-to-br from-purple/20 via-background to-green/10"></div>
		<div class="absolute top-1/4 -left-1/4 h-96 w-96 rounded-full bg-purple/30 blur-3xl"></div>
		<div class="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-green/20 blur-3xl"></div>
		<div
			class="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/10 blur-3xl"
		></div>
	</div>

	<section class="container mx-auto px-4 py-24 md:py-32">
		<div class="mx-auto max-w-4xl text-center">
			<h1 class="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
				<span
					class="bg-gradient-to-r from-purple via-green to-orange bg-clip-text text-transparent"
				>
					Earth Resistivity
				</span>
				<br />
				Data Repository
			</h1>

			<p class="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
				Store, visualize, and analyze Wenner 4-pole earth resistance measurements. Built for
				electrical engineers and earthing professionals.
			</p>

			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<Button
					size="lg"
					href="/project/new"
					class="gap-2 bg-purple text-purple-foreground hover:bg-purple/90"
				>
					Start Uploading
					<ChevronRight class="h-4 w-4" />
				</Button>
				<Button size="lg" variant="outline" href="/about" class="gap-2">Learn More</Button>
			</div>
		</div>
	</section>
</div>

<MapPreview {sites} />

<section class="container mx-auto px-4 py-16">
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		<div
			class="group relative rounded-xl border border-border/40 bg-card p-6 transition-colors hover:border-purple/50"
		>
			<div
				class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple/10 text-purple"
			>
				<MapPin class="h-6 w-6" />
			</div>
			<h3 class="mb-2 text-lg font-semibold">Interactive Map</h3>
			<p class="text-sm text-muted-foreground">
				Full-screen map centered on Sydney with markers showing all test locations. Search addresses
				to find sites.
			</p>
		</div>

		<div
			class="group relative rounded-xl border border-border/40 bg-card p-6 transition-colors hover:border-green/50"
		>
			<div
				class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green/10 text-green"
			>
				<Upload class="h-6 w-6" />
			</div>
			<h3 class="mb-2 text-lg font-semibold">Easy Upload</h3>
			<p class="text-sm text-muted-foreground">
				Upload readings with equipment details, calibration dates, and evidence photos. Support for
				multiple electrode spacings.
			</p>
		</div>

		<div
			class="group relative rounded-xl border border-border/40 bg-card p-6 transition-colors hover:border-orange/50"
		>
			<div
				class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange/10 text-orange"
			>
				<Database class="h-6 w-6" />
			</div>
			<h3 class="mb-2 text-lg font-semibold">Organized Data</h3>
			<p class="text-sm text-muted-foreground">
				Structured database with automatic apparent resistivity calculations. Export to CSV for
				reports.
			</p>
		</div>

		<div
			class="group relative rounded-xl border border-border/40 bg-card p-6 transition-colors hover:border-purple/50"
		>
			<div
				class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple/10 text-purple"
			>
				<BarChart3 class="h-6 w-6" />
			</div>
			<h3 class="mb-2 text-lg font-semibold">Analytics</h3>
			<p class="text-sm text-muted-foreground">
				Visualize resistivity curves and trends. Compare readings across different sites and time
				periods.
			</p>
		</div>
	</div>
</section>

<section class="container mx-auto px-4 py-16">
	<div class="grid items-center gap-12 md:grid-cols-2">
		<div>
			<h2 class="mb-4 text-3xl font-bold">
				<span class="text-purple">Professional</span> Earth Testing
				<br />
				<span class="text-green">Data Management</span>
			</h2>
			<p class="mb-6 text-muted-foreground">
				Terradatum helps electrical engineers and earthing specialists organize their Wenner 4-pole
				test data efficiently. Store readings, track equipment calibration, and maintain a
				searchable repository of all your earth resistance measurements.
			</p>

			<div class="space-y-4">
				<div class="flex items-start gap-3">
					<div
						class="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-green/10 text-green"
					>
						<Zap class="h-3 w-3" />
					</div>
					<div>
						<h4 class="font-medium">Automatic Calculations</h4>
						<p class="text-sm text-muted-foreground">
							Apparent resistivity calculated using ρ = 2πaR formula
						</p>
					</div>
				</div>

				<div class="flex items-start gap-3">
					<div
						class="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-orange/10 text-orange"
					>
						<Shield class="h-3 w-3" />
					</div>
					<div>
						<h4 class="font-medium">Equipment Tracking</h4>
						<p class="text-sm text-muted-foreground">
							Record make, model, and calibration dates for each reading
						</p>
					</div>
				</div>

				<div class="flex items-start gap-3">
					<div
						class="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-purple/10 text-purple"
					>
						<Database class="h-3 w-3" />
					</div>
					<div>
						<h4 class="font-medium">Evidence Photos</h4>
						<p class="text-sm text-muted-foreground">
							Attach images as evidence of test conditions and results
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="relative">
			<div
				class="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple/20 to-green/20 blur-2xl"
			></div>
			<div class="relative overflow-hidden rounded-2xl border border-border/40 bg-card p-6">
				<div class="mb-4 flex items-center justify-between">
					<h4 class="font-semibold">Recent Readings</h4>
					<span class="text-xs text-muted-foreground">Sydney Region</span>
				</div>

				<div class="space-y-3">
					<div class="flex items-center justify-between rounded-lg bg-muted/50 p-3">
						<div class="flex items-center gap-3">
							<div class="h-2 w-2 rounded-full bg-green"></div>
							<div>
								<p class="text-sm font-medium">North Sydney</p>
								<p class="text-xs text-muted-foreground">-33.8200, 151.2100</p>
							</div>
						</div>
						<div class="text-right">
							<p class="text-sm font-medium text-green">24.5 Ω·m</p>
							<p class="text-xs text-muted-foreground">2 days ago</p>
						</div>
					</div>

					<div class="flex items-center justify-between rounded-lg bg-muted/50 p-3">
						<div class="flex items-center gap-3">
							<div class="h-2 w-2 rounded-full bg-orange"></div>
							<div>
								<p class="text-sm font-medium">Parramatta</p>
								<p class="text-xs text-muted-foreground">-33.8150, 151.0000</p>
							</div>
						</div>
						<div class="text-right">
							<p class="text-sm font-medium text-orange">156.2 Ω·m</p>
							<p class="text-xs text-muted-foreground">1 week ago</p>
						</div>
					</div>

					<div class="flex items-center justify-between rounded-lg bg-muted/50 p-3">
						<div class="flex items-center gap-3">
							<div class="h-2 w-2 rounded-full bg-purple"></div>
							<div>
								<p class="text-sm font-medium">Homebush</p>
								<p class="text-xs text-muted-foreground">-33.8750, 151.0750</p>
							</div>
						</div>
						<div class="text-right">
							<p class="text-sm font-medium text-purple">89.3 Ω·m</p>
							<p class="text-xs text-muted-foreground">2 weeks ago</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="container mx-auto px-4 py-16">
	<div
		class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple/20 via-green/10 to-orange/20 p-8 text-center md:p-12"
	>
		<div class="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
		<div class="relative">
			<h2 class="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
			<p class="mx-auto mb-8 max-w-xl text-muted-foreground">
				Join engineers and earthing professionals who use Terradatum to manage their earth
				resistivity data. Start mapping your Wenner 4-pole measurements today.
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<Button
					size="lg"
					href="/project/new"
					class="gap-2 bg-purple text-purple-foreground hover:bg-purple/90"
				>
					Register Project Site
					<ChevronRight class="h-4 w-4" />
				</Button>
				<Button size="lg" variant="outline" href="/map">View Demo Map</Button>
			</div>
		</div>
	</div>
</section>
