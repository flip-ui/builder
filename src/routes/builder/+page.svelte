<script>
	import { data } from '$lib/stores';
	import SideBar from './SideBar.svelte';
</script>

<svelte:head>
	<title>Builder</title>
	<meta name="description" content="Website's specific UI-Builder" />
</svelte:head>

<div class="grid w-full pl-[336px]">
	<aside
		class="inset-y fixed left-0 z-20 flex h-full flex-col border-b border-border/40 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/40"
	>
		<SideBar />
	</aside>
	<div class="flex flex-col p-2">
		{#if $data.views.length > 0}
			<h2 class="h2">{$data.current + 1}. {$data.views[$data.current].type.toString()}</h2>
		{:else}
			<h2 class="h2">No Views</h2>
		{/if}
	</div>
</div>
