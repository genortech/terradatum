<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { browser } from '$app/environment';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Button } from '$lib/components/ui/button';
	import { Sun, Moon, Menu, X } from '@lucide/svelte';

	let { children } = $props();

	let mobileMenuOpen = $state(false);

	let isDark = $state(false);

	$effect(() => {
		if (browser) {
			isDark = document.documentElement.classList.contains('dark');
			const observer = new MutationObserver(() => {
				isDark = document.documentElement.classList.contains('dark');
			});
			observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
			return () => observer.disconnect();
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />

<div class="min-h-screen bg-background text-foreground" class:dark={isDark}>
	<header
		class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
	>
		<div class="container mx-auto flex h-16 items-center justify-between px-4">
			<div class="flex items-center gap-6">
				<a href="/" class="flex items-center gap-2">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple text-purple-foreground"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-5 w-5"
						>
							<circle cx="12" cy="12" r="10" />
							<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
							<path d="M2 12h20" />
						</svg>
					</div>
					<span class="text-xl font-bold">Terradatum</span>
				</a>

				<nav class="hidden items-center gap-6 md:flex">
					<a
						href="/map"
						class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
						>Map</a
					>
					<a
						href="/data"
						class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
						>Data</a
					>
					<a
						href="/about"
						class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
						>About</a
					>
				</nav>
			</div>

			<div class="flex items-center gap-2">
				<button
					onclick={toggleMode}
					class="hidden size-9 items-center justify-center rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground sm:inline-flex"
					aria-label="Toggle theme"
				>
					{#if isDark}
						<Moon class="h-4 w-4" />
					{:else}
						<Sun class="h-4 w-4" />
					{/if}
				</button>

				<div class="hidden items-center gap-2 md:flex">
					<Button variant="ghost" size="sm" href="/auth">Sign In</Button>
					<Button size="sm" href="/auth">Get Started</Button>
				</div>

				<button
					class="p-2 md:hidden"
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					aria-label="Toggle menu"
				>
					{#if mobileMenuOpen}
						<X class="h-5 w-5" />
					{:else}
						<Menu class="h-5 w-5" />
					{/if}
				</button>
			</div>
		</div>

		{#if mobileMenuOpen}
			<div class="border-t border-border/40 bg-background md:hidden">
				<nav class="container flex flex-col gap-4 px-4 py-4">
					<a
						href="/map"
						class="text-sm font-medium text-muted-foreground hover:text-foreground"
						onclick={() => (mobileMenuOpen = false)}>Map</a
					>
					<a
						href="/data"
						class="text-sm font-medium text-muted-foreground hover:text-foreground"
						onclick={() => (mobileMenuOpen = false)}>Data</a
					>
					<a
						href="/about"
						class="text-sm font-medium text-muted-foreground hover:text-foreground"
						onclick={() => (mobileMenuOpen = false)}>About</a
					>
					<div class="flex gap-2 border-t border-border/40 pt-2">
						<Button variant="ghost" size="sm" href="/auth" class="flex-1">Sign In</Button>
						<Button size="sm" href="/auth" class="flex-1">Get Started</Button>
					</div>
				</nav>
			</div>
		{/if}
	</header>

	<main>
		{@render children()}
	</main>

	<footer class="mt-16 border-t border-border/40 py-8">
		<div class="container mx-auto px-4">
			<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
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
					Earth Resistivity Data Repository - Wenner 4-Pole Method
				</p>
			</div>
		</div>
	</footer>
</div>

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>
			{locale}
		</a>
	{/each}
</div>
