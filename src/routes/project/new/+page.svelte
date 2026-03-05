<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { MapPin, ArrowLeft, Save, Upload } from '@lucide/svelte';

	let siteName = $state('');
	let address = $state('');
	let latitude = $state('');
	let longitude = $state('');
	let equipmentMake = $state('');
	let equipmentModel = $state('');
	let calibrationDate = $state('');
	let notes = $state('');
	let isSubmitting = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;

		// Simulate API call - in real app, save to database
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Navigate to upload form with project ID
		goto('/project/new/upload?site=' + encodeURIComponent(siteName));
	}
</script>

<svelte:head>
	<title>Register Project Site - Terradatum</title>
</svelte:head>

<div class="container mx-auto max-w-2xl px-4 py-12">
	<a
		href="/"
		class="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
	>
		<ArrowLeft class="h-4 w-4" />
		Back to Home
	</a>

	<Card>
		<CardHeader>
			<CardTitle class="flex items-center gap-2">
				<MapPin class="h-5 w-5 text-purple" />
				Register Project Site
			</CardTitle>
			<CardDescription>
				Enter the site details for your Wenner 4-pole earth resistance test location.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<form onsubmit={handleSubmit} class="space-y-6">
				<div class="space-y-4">
					<h3 class="text-sm font-medium">Site Information</h3>

					<div class="grid gap-2">
						<Label for="siteName">Site Name *</Label>
						<Input
							id="siteName"
							placeholder="e.g., Sydney CBD Tower"
							bind:value={siteName}
							required
						/>
					</div>

					<div class="grid gap-2">
						<Label for="address">Address *</Label>
						<Input
							id="address"
							placeholder="e.g., 123 George Street, Sydney NSW 2000"
							bind:value={address}
							required
						/>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div class="grid gap-2">
							<Label for="latitude">Latitude *</Label>
							<Input
								id="latitude"
								type="number"
								step="0.000001"
								placeholder="-33.8688"
								bind:value={latitude}
								required
							/>
						</div>
						<div class="grid gap-2">
							<Label for="longitude">Longitude *</Label>
							<Input
								id="longitude"
								type="number"
								step="0.000001"
								placeholder="151.2093"
								bind:value={longitude}
								required
							/>
						</div>
					</div>
				</div>

				<div class="space-y-4">
					<h3 class="text-sm font-medium">Equipment Details</h3>

					<div class="grid grid-cols-2 gap-4">
						<div class="grid gap-2">
							<Label for="equipmentMake">Equipment Make</Label>
							<Input id="equipmentMake" placeholder="e.g., Megger" bind:value={equipmentMake} />
						</div>
						<div class="grid gap-2">
							<Label for="equipmentModel">Model Number</Label>
							<Input id="equipmentModel" placeholder="e.g., DET4TC2" bind:value={equipmentModel} />
						</div>
					</div>

					<div class="grid gap-2">
						<Label for="calibrationDate">Last Calibration Date</Label>
						<Input id="calibrationDate" type="date" bind:value={calibrationDate} />
					</div>
				</div>

				<div class="grid gap-2">
					<Label for="notes">Notes</Label>
					<Textarea
						id="notes"
						placeholder="Additional notes about the test site..."
						bind:value={notes}
						rows="3"
					/>
				</div>

				<div class="flex gap-4">
					<Button type="submit" class="gap-2" disabled={isSubmitting}>
						{#if isSubmitting}
							<span class="animate-spin">⟳</span>
							Saving...
						{:else}
							<Save class="h-4 w-4" />
							Save & Continue to Upload
						{/if}
					</Button>
					<Button type="button" variant="outline" href="/">Cancel</Button>
				</div>
			</form>
		</CardContent>
	</Card>
</div>
