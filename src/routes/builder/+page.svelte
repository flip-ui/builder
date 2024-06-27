<script>
	import SideBar from './SideBar.svelte';
	import Editor from './Editor.svelte';
</script>

<svelte:head>
	<title>Builder - flip</title>
	<meta name="description" content="Website's specific UI-Builder" />
</svelte:head>

<div class="asd grid w-full md:grid-cols-[23rem_auto]">
	<SideBar />
	<Editor />
</div>

<style>
	.asd {
		height: calc(100% - 71px);
	}
</style>
