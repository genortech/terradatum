<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { demoSites } from '$lib/data/sites';
	import { initializeSites, startAddingSites, isInitialized } from '$lib/data/site-store';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let isSignedIn = $state(false);
	let isDark = $state(false);

	onMount(() => {
		if (!isInitialized()) {
			initializeSites(demoSites);
			startAddingSites();
		}
	});

	$effect(() => {
		if (browser) {
			const updateDark = () => {
				isDark = document.documentElement.classList.contains('dark');
			};

			updateDark();

			const observer = new MutationObserver(updateDark);
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ['class']
			});

			return () => observer.disconnect();
		}
	});

	function handleSignOut() {
		isSignedIn = false;
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />

<div class="min-h-screen bg-background text-foreground" class:dark={isDark}>
	<Navbar {isSignedIn} onSignOut={handleSignOut} />

	<main>
		{@render children?.()}
	</main>

	<Footer />
</div>
