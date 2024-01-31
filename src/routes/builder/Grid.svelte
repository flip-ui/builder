<script lang="ts">
	import { type ModalSettings } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { keys } from '$lib/utils';
	import { Grid, GridItem } from 'svelte-grid-extended';
	import { gridController, views } from '$lib/stores';
	import { Align, GuiType, type View } from '$lib/types';

	const modalStore = getModalStore();

	function deleteItem(id: string) {
		$views.pages[$views.current].page = $views.pages[$views.current].page.filter(
			(view: { id: string }) => view.id !== id
		);
		$views = $views;
	}

	function editItem(toChange: View) {
		const modal: ModalSettings = {
			type: 'component',
			component: 'editModal',
			// Data
			meta: { toChange }
		};

		$views = $views;
		modalStore.trigger(modal);
	}

	$: verticalAlign = (align: Align) => {
		switch (align) {
			case Align.Left:
				return '';
			case Align.Right:
				return '';
			case Align.Top:
				return 'items-start';
			case Align.Bottom:
				return 'items-end';
			case Align.Center:
				return 'items-center';
		}
	};
	$: horizontalAlign = (align: Align) => {
		switch (align) {
			case Align.Left:
				return 'justify-start';
			case Align.Right:
				return 'justify-end';
			case Align.Top:
				return '';
			case Align.Bottom:
				return '';
			case Align.Center:
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
	{#if $views.pages[$views.current]}
		{#each $views.pages[$views.current].page as view (view.id)}
			<div transition:fade={{ duration: 300 }}>
				<GridItem
					previewClass="transition-all duration-200 variant-glass rounded-md"
					activeClass="z-[2]"
					id={view.id}
					bind:x={view.x}
					bind:y={view.y}
					bind:w={view.w}
					bind:h={view.h}
					movable={view.moveable}
					resizable={false}
					class="pt-2 pb-2 pr-5 pl-5 rounded-md variant-glass"
				>
					{#if view.type == GuiType.Header}
						<div
							class="flex {!view.data.text_value ? 'opacity-30' : ''} {verticalAlign(
								view.data.vertical || Align.Top
							)} {horizontalAlign(view.data.horizontal || Align.Left)} h-full"
						>
							<h2 class="lg:h2 h3 truncate">
								{#if view.data.text_value}
									{view.data.text_value}
								{:else}
									Unset
								{/if}
							</h2>
						</div>
					{:else if view.type == GuiType.BodyText}
						<div
							class="flex {!view.data.text_value ? 'opacity-30' : ''} {verticalAlign(
								view.data.vertical || Align.Top
							)} {horizontalAlign(view.data.horizontal || Align.Left)} h-full"
						>
							<p class="lg:text-base text-xs truncate">
								{#if view.data.text_value}
									{view.data.text_value}
								{:else}
									Unset
								{/if}
							</p>
						</div>
					{:else if view.type == GuiType.Buttons}
						{#if view.data.actions}
							<div class="flex justify-between items-center h-full">
								{#each view.data.actions as action}
									{#if action}
										<span
											class="rounded-sm pt-2 pb-2 pr-5 pl-5 variant-filled truncate h-fit lg:text-base text-xs"
										>
											{action.text_value}
											{#if action.event}
												<span
													class="ml-2 badge variant-filled-tertiary z-10 place-self-center truncate lg:text-base text-xs"
													>{Object.keys(action.event)[0]}</span
												>
											{/if}
										</span>
									{:else}
										<span
											class="rounded-sm pt-2 pb-2 pr-5 pl-5 variant-filled opacity-30 truncate h-fit lg:text-base text-xs"
											>Unset</span
										>
									{/if}
								{/each}
							</div>
						{/if}
					{:else if view.type == GuiType.Alert}
						{#if view.data.text_value}
							<p class="truncate lg:text-base text-xs">{view.data.text_value}</p>
						{:else}
							<p class="opacity-30 truncate lg:text-base text-xs">Unset</p>
						{/if}
						<div class="flex justify-center items-end h-full">
							{#if view.data.actions && view.data.actions[0]}
								<span
									class="rounded-sm pt-2 pb-2 pr-5 pl-5 variant-filled truncate h-fit mb-8 lg:text-base text-xs"
								>
									{view.data.actions[0].text_value}
									{#if view.data.actions[0].event}
										<span
											class="ml-2 badge variant-filled-tertiary z-10 place-self-center truncate lg:text-base text-xs"
											>{Object.keys(view.data.actions[0].event)[0]}</span
										>
									{/if}
								</span>
							{:else}
								<span
									class="rounded-sm pt-2 pb-2 pr-5 pl-5 variant-filled opacity-30 truncate h-fit mb-8 lg:text-base text-xs"
									>Unset</span
								>
							{/if}
						</div>
					{:else}
						{view.name},
						{#each keys(view.data) as key (key)}
							<span class="flex-auto truncate">{key}: {view.data[key]}, </span>
						{/each}
					{/if}
					<span class="badge variant-filled absolute -top-4 -left-4 z-[2]">{view.name}</span>
					<button
						class="btn w-8 h-[24px] pt-1 pb-1 pr-2 pl-2 variant-filled-primary absolute -top-4 right-8 z-[99]"
						title="Edit"
						on:click={() => editItem(view)}
						on:pointerdown={(e) => e.stopPropagation()}><i class="fa-solid fa-pen"></i></button
					>
					<button
						class="btn w-8 h-[24px] pt-1 pb-1 pr-2 pl-2 variant-filled-error absolute -top-4 -right-4 z-[99]"
						title="Delete"
						on:click={() => deleteItem(view.id)}
						on:pointerdown={(e) => e.stopPropagation()}
						><i class="fa-solid fa-delete-left"></i></button
					>
				</GridItem>
			</div>
		{/each}
	{/if}
</Grid>
