<script lang="ts">
	import { type ModalSettings } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { keys } from '$lib/utils';
	import { Grid, GridItem } from 'svelte-grid-extended';
	import { gridController, views } from '$lib/stores';
	import { GuiAlign, GuiType, type Item } from '$lib/types';

	const modalStore = getModalStore();

	function deleteItem(id: string) {
		$views.views[$views.current].rows = $views.views[$views.current].rows.filter(
			(item: { id: string }) => item.id !== id
		);
		$views = $views;
	}

	function editItem(toChange: Item) {
		const modal: ModalSettings = {
			type: 'component',
			component: 'editModal',
			// Data
			meta: { toChange }
		};

		$views = $views;
		modalStore.trigger(modal);
	}

	$: verticalAlign = (align: GuiAlign) => {
		switch (align) {
			case GuiAlign.Left:
				return '';
			case GuiAlign.Right:
				return '';
			case GuiAlign.Top:
				return 'items-start';
			case GuiAlign.Bottom:
				return 'items-end';
			case GuiAlign.Center:
				return 'items-center';
		}
	};
	$: horizontalAlign = (align: GuiAlign) => {
		switch (align) {
			case GuiAlign.Left:
				return 'justify-start';
			case GuiAlign.Right:
				return 'justify-end';
			case GuiAlign.Top:
				return '';
			case GuiAlign.Bottom:
				return '';
			case GuiAlign.Center:
				return 'justify-center';
		}
	};
</script>

<Grid
	debug
	bounds
	cols={20}
	rows={10}
	collision="none"
	bind:controller={$gridController}
	class="z-[1]"
>
	{#if $views.views[$views.current]}
		{#each $views.views[$views.current].rows as item (item.id)}
			<div transition:fade={{ duration: 300 }}>
				<GridItem
					previewClass="transition-all duration-200 variant-glass rounded-md"
					activeClass="z-[2]"
					id={item.id}
					bind:x={item.x}
					bind:y={item.y}
					bind:w={item.w}
					bind:h={item.h}
					movable={item.moveable}
					resizable={false}
					class="pt-2 pb-2 pr-5 pl-5 rounded-md variant-glass"
				>
					{#if item.type == GuiType.Header}
						{#if typeof item.data.textValue == 'object'}
							{#if item.data.textValue?.text}
								<div
									class="flex {verticalAlign(item.data.textValue?.vertical)} {horizontalAlign(
										item.data.textValue?.horizontal
									)} h-full"
								>
									<h2 class="h2 truncate">
										{item.data.textValue.text}
									</h2>
								</div>
							{:else}
								<div
									class="flex opacity-30 {verticalAlign(
										item.data.textValue?.vertical || GuiAlign.Top
									)} {horizontalAlign(item.data.textValue?.horizontal || GuiAlign.Left)} h-full"
								>
									<h2 class="h2 truncate">Unset</h2>
								</div>
							{/if}
						{:else}
							<p class="truncate">
								TypeError: Mismatched Type. Please delete this Element and put in a new one!
							</p>
						{/if}
					{:else if item.type == GuiType.BodyText}
						{#if typeof item.data.textValue == 'object'}
							{#if item.data.textValue?.text}
								<div
									class="flex {verticalAlign(item.data.textValue?.vertical)} {horizontalAlign(
										item.data.textValue?.horizontal
									)} h-full"
								>
									<p class="truncate">
										{item.data.textValue.text}
									</p>
								</div>
							{:else}
								<div
									class="flex opacity-30 {verticalAlign(
										item.data.textValue?.vertical || GuiAlign.Top
									)} {horizontalAlign(item.data.textValue?.horizontal || GuiAlign.Left)} h-full"
								>
									<p class="truncate">Unset</p>
								</div>
							{/if}
						{:else}
							<p class="truncate">
								TypeError: Mismatched Type. Please delete this Element and put in a new one!
							</p>
						{/if}
					{:else if item.type == GuiType.Buttons}
						{#if item.data.actions}
							<div class="flex justify-between items-center h-full">
								{#each item.data.actions as action}
									{#if action}
										<span
											class="rounded-sm pt-2 pb-2 pr-5 pl-5 variant-filled flex-nowrap flex truncate h-fit"
										>
											{action.textValue}
											{#if action.event}
												<span
													class="ml-2 badge variant-filled-tertiary z-10 place-self-center truncate"
													>{action.event.type}</span
												>
											{/if}
										</span>
									{:else}
										<span
											class="rounded-sm pt-2 pb-2 pr-5 pl-5 variant-filled opacity-30 truncate h-fit"
											>Unset</span
										>
									{/if}
								{/each}
							</div>
						{/if}
					{:else if item.type == GuiType.Alert}
						{#if item.data.textValue}
							<p class="truncate">{item.data.textValue}</p>
						{:else}
							<p class="opacity-30 truncate">Unset</p>
						{/if}
						<div class="flex justify-center items-end h-full">
							{#if item.data.actions && item.data.actions[0]}
								<span class="rounded-sm pt-2 pb-2 pr-5 pl-5 variant-filled truncate h-fit mb-8">
									{item.data.actions[0].textValue}
									{#if item.data.actions[0].event}
										<span class="ml-2 badge variant-filled-tertiary z-10 place-self-center truncate"
											>{item.data.actions[0].event.type}</span
										>
									{/if}
								</span>
							{:else}
								<span
									class="rounded-sm pt-2 pb-2 pr-5 pl-5 variant-filled opacity-30 truncate h-fit mb-8"
									>Unset</span
								>
							{/if}
						</div>
					{:else}
						{item.name},
						{#each keys(item.data) as key (key)}
							<span class="flex-auto truncate">{key}: {item.data[key]}, </span>
						{/each}
					{/if}
					<span class="badge variant-filled absolute -top-4 -left-4 z-[2]">{item.name}</span>
					<button
						class="btn w-8 h-[24px] pt-1 pb-1 pr-2 pl-2 variant-filled-primary absolute -top-4 right-8 z-[2]"
						title="Edit"
						on:click={() => editItem(item)}
						on:pointerdown={(e) => e.stopPropagation()}><i class="fa-solid fa-pen"></i></button
					>
					<button
						class="btn w-8 h-[24px] pt-1 pb-1 pr-2 pl-2 variant-filled-error absolute -top-4 -right-4 z-[2]"
						title="Delete"
						on:click={() => deleteItem(item.id)}
						on:pointerdown={(e) => e.stopPropagation()}
						><i class="fa-solid fa-delete-left"></i></button
					>
				</GridItem>
			</div>
		{/each}
	{/if}
</Grid>
