<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	// Stores
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { views } from '$lib/stores';
	import { Align, alignToString, GuiType, type View, type Action } from '$lib/types';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();
	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';

	let view: View = $modalStore[0]?.meta.toChange;

	// apply reactivity on close
	modalStore.subscribe((modals: ModalSettings[]) => {
		if (!modals.length) $views = $views;
	});

	// select shenanigans
	let ev = new Array(view.data.actions?.length).fill('view');
</script>

<!-- @component This is an Edit Modal for the Items. -->

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>Edit</header>

		{#if view.data.text_value != null}
			{#if typeof view.data.text_value == 'string'}
				<label class="label">
					<span>Edit Text</span>
					<input
						class="input"
						type="text"
						placeholder="Text Value and/or Variable using {'{'}var_name{'}'}"
						bind:value={view.data.text_value}
						maxlength="70"
					/>
				</label>
			{/if}
			{#if view.data.horizontal != null && view.data.vertical != null}
				<label class="label">
					<span>Horizontal Align</span>
					<select class="select" bind:value={view.data.horizontal}>
						{#each Object.values(Align).filter((value) => typeof value === 'number') as align}
							<option value={align}>{alignToString(align)}</option>
						{/each}
					</select>
				</label>
				<label class="label">
					<span>Vertical Align</span>
					<select class="select" bind:value={view.data.vertical}>
						{#each Object.values(Align).filter((value) => typeof value === 'number') as align}
							<option value={align}>{alignToString(align)}</option>
						{/each}
					</select>
				</label>
			{/if}
		{/if}

		{#if view.data.actions != null}
			{#each view.data.actions as action, i}
				{#if action != null}
					<label class="label">
						<span>Action {i + 1}</span>
						<input
							class="input"
							type="text"
							disabled={view.type == GuiType.Alert}
							placeholder="Text Value and/or Variable using {'{'}var_name{'}'}"
							bind:value={action.text_value}
							maxlength="40"
						/>
						<div class="input-group input-group-divider grid-cols-[1fr_auto]">
							{#if 'View' in action.event}
								<input
									type="number"
									placeholder="Number of View (leave blank for Closing the App)"
									bind:value={action.event.View}
									maxlength="10"
								/>
							{:else}
								<input
									type="text"
									placeholder="Function Name with () for Params"
									bind:value={action.event.Function}
									maxlength="40"
								/>
							{/if}
							<select
								bind:value={ev[i]}
								on:change={() => {
									if (ev[i] === 'view') {
										if (action) action.event = { View: 1 };
									} else if (ev[i] === 'function') {
										if (action) action.event = { Function: '' };
									}
								}}
							>
								<option value={'view'}>View</option>
								<option value={'function'}>Function</option>
							</select>
						</div>
						<button
							class="btn variant-filled"
							on:click={() => (action = null)}
							disabled={view.type == GuiType.Alert}
							><i class="fa-solid fa-minus mr-2"></i>Remove Action</button
						>
					</label>
				{:else}
					<label class="label">
						<div>Action {i + 1}</div>
						<button
							class="btn variant-filled"
							on:click={() => {
								action = {
									text_value: '',
									event: { View: 1 }
								};
							}}><i class="fa-solid fa-plus mr-2"></i> Add Action</button
						>
					</label>
				{/if}
			{/each}
		{/if}

		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Close</button>
    </footer>
	</div>
{/if}
