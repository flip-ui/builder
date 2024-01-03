<script lang="ts">
	import '../app.postcss';
	import '@fortawesome/fontawesome-free/css/all.css';
	import {
		AppShell,
		AppBar,
		Modal,
		Drawer,
		type DrawerSettings,
		getDrawerStore,
		type ModalComponent
	} from '@skeletonlabs/skeleton';

	// stores
	import { initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();

	const modalRegistry: Record<string, ModalComponent> = {
		editModal: { ref: EditModal }
	};

	const drawerStore = getDrawerStore();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import Menu from './builder/Menu.svelte';
	import { page } from '$app/stores';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// hljs
	import hljs from 'highlight.js/lib/core';
	import rust from 'highlight.js/lib/languages/rust';
	hljs.registerLanguage('rust', rust);
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import EditModal from './builder/EditModal.svelte';
	storeHighlightJs.set(hljs);

	// Drawer Handler
	function drawerOpen(): void {
		const s: DrawerSettings = { id: 'doc-sidenav' };
		drawerStore.open(s);
	}
</script>

<Modal components={modalRegistry} />
<Drawer class={$drawerStore.id === 'doc-sidenav' ? 'lg:hidden' : ''}>
	{#if $drawerStore.id === 'doc-sidenav'}
		<Menu embedded={true} />
	{:else}
		<!-- Fallback Error -->
		<div class="w-full h-full flex justify-center items-center">
			<div class="text-center space-y-2">
				<p>Invalid <code class="code">$drawerStore.id</code> provided.</p>
			</div>
		</div>
	{/if}
</Drawer>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-50-900-token">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar shadow="shadow-2xl" slotTrail="!space-x-2">
			<svelte:fragment slot="lead">
				<!-- Hamburger Menu -->
				{#if $page.url.pathname == '/builder'}
					<button on:click={drawerOpen} class="btn-icon btn-icon-sm lg:!hidden">
						<i class="fa-solid fa-bars text-xl" />
					</button>
				{/if}
				<a href="/"><h1 class="h1 scale-x-[-1] scale-y-[-1]">flip</h1></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn hover:variant-soft-primary {$page.url.pathname == '/'
						? 'bg-primary-active-token'
						: ''}"
					href="/"
					data-sveltekit-preload-data="hover">Home</a
				>
				<a
					class="btn hover:variant-soft-primary {$page.url.pathname == '/builder'
						? 'bg-primary-active-token'
						: ''}"
					href="/builder"
					data-sveltekit-preload-data="hover">Builder</a
				>
				<a
					class="btn w-12 hover:variant-soft-primary"
					style="padding-top: 13px; padding-bottom: 13px;"
					href="https://github.com/flip-ui/flip-ui.github.io/"
					target="_blank"
					rel="noreferrer"
					><i class="fa-brands fa-github text-lg"></i>
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		{#if $page.url.pathname == '/builder'}
			<Menu class="hidden lg:grid w-[360px] overflow-hidden" />
		{/if}
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
