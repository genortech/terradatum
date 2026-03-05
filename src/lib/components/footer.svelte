<script lang="ts">
	import { MapPin, User, Settings, HelpCircle, Mail } from '@lucide/svelte';
</script>

<footer class="mt-16 border-t border-border/40 py-12">
	<div class="container mx-auto px-4">
		<div class="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
			<div>
				<h4 class="mb-4 font-semibold">Product</h4>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li><a href="/map" class="transition-colors hover:text-foreground">Map</a></li>
					<li>
						<a href="/project/new" class="transition-colors hover:text-foreground">Upload Data</a>
					</li>
					<li><a href="/about" class="transition-colors hover:text-foreground">Features</a></li>
				</ul>
			</div>
			<div>
				<h4 class="mb-4 font-semibold">Company</h4>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li><a href="/about" class="transition-colors hover:text-foreground">About</a></li>
					<li><a href="/contact" class="transition-colors hover:text-foreground">Contact</a></li>
				</ul>
			</div>
			<div>
				<h4 class="mb-4 font-semibold">Legal</h4>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li>
						<a href="/legal/terms" class="transition-colors hover:text-foreground"
							>Terms of Service</a
						>
					</li>
					<li>
						<a href="/legal/privacy" class="transition-colors hover:text-foreground"
							>Privacy Policy</a
						>
					</li>
				</ul>
			</div>
			<div>
				<h4 class="mb-4 font-semibold">Connect</h4>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li><a href="/contact" class="transition-colors hover:text-foreground">Support</a></li>
					<li>
						<a href="mailto:support@terradatum.com" class="transition-colors hover:text-foreground"
							>Email Us</a
						>
					</li>
				</ul>
			</div>
		</div>
		<div
			class="flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row"
		>
			<div class="flex items-center gap-2">
				<div
					class="flex h-6 w-6 items-center justify-center rounded-md bg-purple text-purple-foreground"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-4 w-4"
					>
						<circle cx="12" cy="12" r="10" />
						<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
						<path d="M2 12h20" />
					</svg>
				</div>
				<span class="text-sm font-medium">Terradatum</span>
			</div>
			<p class="text-sm text-muted-foreground">
				&copy; {new Date().getFullYear()} Terradatum. All rights reserved.
			</p>
		</div>
	</div>
</footer>
