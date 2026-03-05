<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { Sun, Moon, Menu, X, User, Settings, LogOut, FolderOpen } from '@lucide/svelte';

	interface Props {
		isSignedIn?: boolean;
		onSignOut?: () => void;
	}

	let { isSignedIn = false, onSignOut = () => {} }: Props = $props();

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

	function handleSignOut() {
		onSignOut();
	}
</script>

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
				>
					Map
				</a>
				<a
					href="/project/new"
					class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
				>
					Project
				</a>
				<a
					href="/about"
					class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
				>
					About
				</a>
				<a
					href="/contact"
					class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
				>
					Contact
				</a>
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

			{#if isSignedIn}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button variant="ghost" size="icon" class="rounded-full">
							<Avatar>
								<AvatarImage src="" alt="User" />
								<AvatarFallback class="bg-purple text-purple-foreground">U</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end" class="w-56">
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<a href="/project/new" class="flex w-full items-center">
								<FolderOpen class="mr-2 h-4 w-4" />
								New Project
							</a>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<a href="/profile" class="flex w-full items-center">
								<User class="mr-2 h-4 w-4" />
								Profile
							</a>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<a href="/settings" class="flex w-full items-center">
								<Settings class="mr-2 h-4 w-4" />
								Settings
							</a>
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item onclick={handleSignOut}>
							<LogOut class="mr-2 h-4 w-4" />
							Log out
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Button variant="ghost" size="sm" href="/auth">Sign In</Button>
			{/if}

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
					onclick={() => (mobileMenuOpen = false)}
				>
					Map
				</a>
				<a
					href="/project/new"
					class="text-sm font-medium text-muted-foreground hover:text-foreground"
					onclick={() => (mobileMenuOpen = false)}
				>
					Project
				</a>
				<a
					href="/about"
					class="text-sm font-medium text-muted-foreground hover:text-foreground"
					onclick={() => (mobileMenuOpen = false)}
				>
					About
				</a>
				<a
					href="/contact"
					class="text-sm font-medium text-muted-foreground hover:text-foreground"
					onclick={() => (mobileMenuOpen = false)}
				>
					Contact
				</a>
				{#if !isSignedIn}
					<div class="border-t border-border/40 pt-2">
						<Button variant="ghost" size="sm" href="/auth" class="w-full">Sign In</Button>
					</div>
				{/if}
			</nav>
		</div>
	{/if}
</header>
