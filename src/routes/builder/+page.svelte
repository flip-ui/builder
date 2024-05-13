<script>
	import SideBar from './SideBar.svelte';
	import Editor from './Editor.svelte';
</script>

<svelte:head>
	<title>Builder</title>
	<meta name="description" content="Website's specific UI-Builder" />
</svelte:head>

<div class="asd grid w-full md:pl-[336px]">
	<aside
		class="inset-y fixed left-0 z-20 hidden h-full flex-col border-b border-border/40 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/40 md:flex"
	>
		<SideBar />
	</aside>
	<div class="h-full p-2">
		<Editor />
	</div>
</div>

<style>
	.asd {
		height: calc(100% - 71px);
	}
</style>
