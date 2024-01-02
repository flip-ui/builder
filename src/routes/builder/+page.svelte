<script lang="ts">
	import { views } from '$lib/stores';
	import Grid from './Grid.svelte';
</script>

<h2 class="h2 m-2">{$views.views.length != 0 ? `View ${$views.current + 1}` : 'No Views!'}</h2>
<div
	class="card p-4 m-2 {$views.views.length != 0
		? 'variant-ghost-primary'
		: 'variant-ghost'} overflow-hidden"
>
	<Grid />
</div>

<style>
	div {
		height: calc(100% - 64px);
	}
</style>
