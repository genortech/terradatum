<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Upload, ArrowLeft, Plus, Trash2, CheckCircle } from '@lucide/svelte';

	let siteName = $state(decodeURIComponent(page.url.searchParams.get('site') || 'New Site'));

	interface Reading {
		id: number;
		electrodeSpacing: string;
		resistance: string;
	}

	let readings = $state<Reading[]>([{ id: 1, electrodeSpacing: '', resistance: '' }]);

	let testDate = $state('');
	let isSubmitting = $state(false);

	function addReading() {
		readings = [...readings, { id: Date.now(), electrodeSpacing: '', resistance: '' }];
	}

	function removeReading(id: number) {
		readings = readings.filter((r) => r.id !== id);
	}

	function calculateApparentResistivity(spacing: number, resistance: number): number {
		// ρ = 2πaR (Wenner formula)
		return 2 * Math.PI * spacing * resistance;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;

		await new Promise((resolve) => setTimeout(resolve, 1000));

		alert('Readings uploaded successfully!');
		goto('/');
	}
</script>

<svelte:head>
	<title>Upload Readings - Terradatum</title>
</svelte:head>

<div class="container mx-auto max-w-3xl px-4 py-12">
	<a
		href="/project/new"
		class="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
	>
		<ArrowLeft class="h-4 w-4" />
		Back to Site Registration
	</a>

	<Card>
		<CardHeader>
			<CardTitle class="flex items-center gap-2">
				<Upload class="h-5 w-5 text-green" />
				Upload Wenner 4-Pole Readings
			</CardTitle>
			<CardDescription>
				Site: <span class="font-medium text-foreground">{siteName}</span>
			</CardDescription>
		</CardHeader>
		<CardContent>
			<form onsubmit={handleSubmit} class="space-y-6">
				<div class="grid gap-2">
					<Label for="testDate">Test Date *</Label>
					<Input id="testDate" type="date" bind:value={testDate} required />
				</div>

				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<h3 class="text-sm font-medium">Readings</h3>
						<Button type="button" variant="outline" size="sm" onclick={addReading} class="gap-1">
							<Plus class="h-3 w-3" />
							Add Reading
						</Button>
					</div>

					<div class="overflow-hidden rounded-lg border border-border/40">
						<table class="w-full">
							<thead class="bg-muted/50">
								<tr>
									<th class="px-4 py-2 text-left text-xs font-medium text-muted-foreground"
										>Electrode Spacing (a) in meters</th
									>
									<th class="px-4 py-2 text-left text-xs font-medium text-muted-foreground"
										>Resistance (R) in Ω</th
									>
									<th class="px-4 py-2 text-left text-xs font-medium text-muted-foreground"
										>Apparent Resistivity (Ω·m)</th
									>
									<th class="w-10 px-4 py-2"></th>
								</tr>
							</thead>
							<tbody>
								{#each readings as reading (reading.id)}
									<tr class="border-t border-border/40">
										<td class="p-2">
											<Input
												type="number"
												step="0.01"
												placeholder="e.g., 1.5"
												bind:value={reading.electrodeSpacing}
												required
											/>
										</td>
										<td class="p-2">
											<Input
												type="number"
												step="0.01"
												placeholder="e.g., 25.5"
												bind:value={reading.resistance}
												required
											/>
										</td>
										<td class="p-2 text-sm text-muted-foreground">
											{#if reading.electrodeSpacing && reading.resistance}
												{calculateApparentResistivity(
													parseFloat(reading.electrodeSpacing) || 0,
													parseFloat(reading.resistance) || 0
												).toFixed(2)} Ω·m
											{:else}
												—
											{/if}
										</td>
										<td class="p-2">
											{#if readings.length > 1}
												<button
													type="button"
													class="p-2 text-muted-foreground hover:text-destructive"
													onclick={() => removeReading(reading.id)}
												>
													<Trash2 class="h-4 w-4" />
												</button>
											{/if}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
					<p class="text-xs text-muted-foreground">Formula: ρ = 2πaR (Wenner 4-pole method)</p>
				</div>

				<div class="flex gap-4">
					<Button type="submit" class="gap-2" disabled={isSubmitting}>
						{#if isSubmitting}
							<span class="animate-spin">⟳</span>
							Uploading...
						{:else}
							<CheckCircle class="h-4 w-4" />
							Submit Readings
						{/if}
					</Button>
					<Button type="button" variant="outline" href="/">Cancel</Button>
				</div>
			</form>
		</CardContent>
	</Card>
</div>
