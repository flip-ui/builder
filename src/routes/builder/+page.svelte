<script>
	import SideBar from './SideBar.svelte';
	import Editor from './Editor.svelte';
</script>

<svelte:head>
	<title>Builder</title>
	<meta name="description" content="Website's specific UI-Builder" />
</svelte:head>

<div class="grid w-full pl-[336px] asd">
	<aside
		class="inset-y fixed left-0 z-20 flex h-full flex-col border-b border-border/40 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/40"
	>
		<SideBar />
	</aside>
	<div class="p-2 h-full">
		<Editor />
	</div>
</div>

<style>
	.asd {
		height: calc(100% - 71px);
	}
</style>