<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	// Stores
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { views } from '$lib/stores';
	import { EventType, GuiAlign, GuiType, type Item } from '$lib/types';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();
	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';

	let item: Item = $modalStore[0]?.meta.toChange;

	// apply reactivity on close
	modalStore.subscribe((modals: ModalSettings[]) => {
		if (!modals.length) $views = $views;
	});
</script>

<!-- @component This is an Edit Modal for the Items. -->

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>Edit</header>

		{#if item.data.textValue != null}
			{#if typeof item.data.textValue == 'string'}
				<label class="label">
					<span>Edit Text</span>
					<input
						class="input"
						type="text"
						placeholder="Text Value and/or Variable using {'{'}var_name{'}'}"
						bind:value={item.data.textValue}
						maxlength="70"
					/>
				</label>
			{:else if typeof item.data.textValue == 'object'}
				<label class="label">
					<span>Edit Text</span>
					<input
						class="input"
						type="text"
						placeholder="Text Value and/or Variable using {'{'}var_name{'}'}"
						bind:value={item.data.textValue.text}
						maxlength="70"
					/>
				</label>
				<label class="label">
					<span>Horizontal Align</span>
					<select class="select" bind:value={item.data.textValue.horizontal}>
						{#each Object.values(GuiAlign).filter((value) => typeof value === 'string') as align}
							<option value={align}>{align.charAt(0).toUpperCase() + align.slice(1)}</option>
						{/each}
					</select>
				</label>
				<label class="label">
					<span>Vertical Align</span>
					<select class="select" bind:value={item.data.textValue.vertical}>
						{#each Object.values(GuiAlign).filter((value) => typeof value === 'string') as align}
							<option value={align}>{align.charAt(0).toUpperCase() + align.slice(1)}</option>
						{/each}
					</select>
				</label>
			{:else}
				<aside class="alert variant-ghost">
					<div class="alert-message">
						<h3 class="h3">Critical Error!</h3>
						<p>
							Wrong provided Type found! Please re-add the item. If the issue persists, feel free to
							open an issue on GitHub!
						</p>
					</div>
				</aside>
			{/if}
		{/if}

		{#if item.data.actions != null}
			{#each item.data.actions as action, i}
				{#if action != null}
					<label class="label">
						<span>Action {i + 1}</span>
						<input
							class="input"
							type="text"
							disabled={item.type == GuiType.Alert}
							placeholder="Text Value and/or Variable using {'{'}var_name{'}'}"
							bind:value={action.textValue}
							maxlength="40"
						/>
						<div class="input-group input-group-divider grid-cols-[1fr_auto]">
							{#if action?.event.type === EventType.View}
								<input
									type="number"
									placeholder="Number of View"
									bind:value={action.event.data}
									maxlength="10"
								/>
							{:else}
								<input
									type="text"
									placeholder="Function Name with () for Params"
									bind:value={action.event.data}
									maxlength="40"
								/>
							{/if}
							<select
								bind:value={action.event.type}
								on:change={() => {
									if (action) action.event.data = undefined;
								}}
							>
								<option value={EventType.View}>View</option>
								<option value={EventType.Function}>Function</option>
							</select>
						</div>
						<!-- <input
							class="input"
							type="text"
							placeholder="View Number or Function Name with () for Params"
							bind:value={action.event}
							maxlength="40"
						/> -->
						<button
							class="btn variant-filled"
							on:click={() => (action = null)}
							disabled={item.type == GuiType.Alert}
							><i class="fa-solid fa-minus mr-2"></i>Remove Action</button
						>
					</label>
				{:else}
					<label class="label">
						<div>Action {i + 1}</div>
						<button
							class="btn variant-filled"
							on:click={() =>
								(action = {
									textValue: undefined,
									event: {
										type: EventType.View,
										data: undefined
									}
								})}><i class="fa-solid fa-plus mr-2"></i> Add Action</button
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
