<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { ArrowLeft, Send, Mail, Phone, MapPin } from '@lucide/svelte';

	let name = $state('');
	let email = $state('');
	let reason = $state('');
	let message = $state('');
	let isSubmitting = $state(false);
	let submitted = $state(false);

	const reasons = [
		{ value: '', label: 'Select a reason' },
		{ value: 'support', label: 'Technical Support' },
		{ value: 'enquiries', label: 'Sales Enquiries' },
		{ value: 'billing', label: 'Billing & Payments' },
		{ value: 'partnership', label: 'Partnership Opportunities' },
		{ value: 'feedback', label: 'Feature Feedback' },
		{ value: 'bug', label: 'Report a Bug' },
		{ value: 'other', label: 'Other' }
	];

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;

		await new Promise((resolve) => setTimeout(resolve, 1000));

		submitted = true;
		isSubmitting = false;
	}
</script>

<svelte:head>
	<title>Contact Us - Terradatum</title>
</svelte:head>

<div class="container mx-auto max-w-2xl px-4 py-12">
	<a
		href="/"
		class="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
	>
		<ArrowLeft class="h-4 w-4" />
		Back to Home
	</a>

	<Card>
		<CardHeader>
			<CardTitle class="flex items-center gap-2">
				<Send class="h-5 w-5 text-purple" />
				Contact Us
			</CardTitle>
			<CardDescription>
				Have a question or need help? We'd love to hear from you. Fill out the form below and we'll
				get back to you as soon as possible.
			</CardDescription>
		</CardHeader>
		<CardContent>
			{#if submitted}
				<div class="flex flex-col items-center justify-center py-8 text-center">
					<div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green/10">
						<Send class="h-8 w-8 text-green" />
					</div>
					<h3 class="mb-2 text-xl font-semibold">Message Sent!</h3>
					<p class="mb-6 text-muted-foreground">
						Thank you for reaching out. We'll get back to you within 24-48 hours.
					</p>
					<Button
						variant="outline"
						onclick={() => {
							submitted = false;
							name = '';
							email = '';
							reason = '';
							message = '';
						}}
					>
						Send Another Message
					</Button>
				</div>
			{:else}
				<form onsubmit={handleSubmit} class="space-y-6">
					<div class="grid gap-2">
						<Label for="name">Full Name *</Label>
						<Input id="name" placeholder="John Smith" bind:value={name} required />
					</div>

					<div class="grid gap-2">
						<Label for="email">Email Address *</Label>
						<Input
							id="email"
							type="email"
							placeholder="john@example.com"
							bind:value={email}
							required
						/>
					</div>

					<div class="grid gap-2">
						<Label for="reason">Reason for Contact *</Label>
						<select
							id="reason"
							bind:value={reason}
							required
							class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background dark:text-foreground"
						>
							{#each reasons as r}
								<option
									value={r.value}
									disabled={r.value === ''}
									class="dark:bg-background dark:text-foreground">{r.label}</option
								>
							{/each}
						</select>
					</div>

					<div class="grid gap-2">
						<Label for="message">Message *</Label>
						<Textarea
							id="message"
							placeholder="Tell us how we can help..."
							bind:value={message}
							rows="5"
							required
						/>
					</div>

					<Button type="submit" class="w-full gap-2" disabled={isSubmitting}>
						{#if isSubmitting}
							<span class="animate-spin">⟳</span>
							Sending...
						{:else}
							<Send class="h-4 w-4" />
							Send Message
						{/if}
					</Button>
				</form>
			{/if}
		</CardContent>
	</Card>

	<div class="mt-12 grid gap-6 md:grid-cols-3">
		<div class="flex items-start gap-3">
			<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple/10 text-purple">
				<Mail class="h-5 w-5" />
			</div>
			<div>
				<h4 class="font-medium">Email</h4>
				<p class="text-sm text-muted-foreground">support@terradatum.com</p>
			</div>
		</div>

		<div class="flex items-start gap-3">
			<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green/10 text-green">
				<Phone class="h-5 w-5" />
			</div>
			<div>
				<h4 class="font-medium">Phone</h4>
				<p class="text-sm text-muted-foreground">+61 2 9000 0000</p>
			</div>
		</div>

		<div class="flex items-start gap-3">
			<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-orange/10 text-orange">
				<MapPin class="h-5 w-5" />
			</div>
			<div>
				<h4 class="font-medium">Location</h4>
				<p class="text-sm text-muted-foreground">Sydney, NSW, Australia</p>
			</div>
		</div>
	</div>
</div>
