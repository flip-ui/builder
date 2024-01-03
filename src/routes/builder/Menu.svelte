<script lang="ts">
	import { gridController, views } from '$lib/stores';
	import { AppRail, AppRailAnchor, AppRailTile, getDrawerStore } from '@skeletonlabs/skeleton';
	import {
		GuiAlign,
		type AlignedText,
		GuiType,
		type Actions,
		type Option,
		type Views,
		EventType
	} from './../../lib/types';
	import { areItemsColliding } from '$lib/utils';

	const drawerStore = getDrawerStore();

	let currentTile: number = 0;

	function addNewItem(type: GuiType) {
		const { name, w, h, x, y, moveable, actions, textValue } = matchTypes(type);
		const newPosition =
			x || y ? { x: x ?? w, y: y ?? h } : $gridController.getFirstAvailablePosition(w, h);

		const newItem = {
			id: crypto.randomUUID(),
			x: newPosition?.x ?? 0,
			y: newPosition?.y ?? 0,
			w,
			h,
			type,
			name,
			moveable,
			data: { textValue, actions }
		};

		if (!areItemsColliding(newItem, $views.views[$views.current].rows))
			$views.views[$views.current].rows = newPosition
				? [...$views.views[$views.current].rows, newItem]
				: $views.views[$views.current].rows;
	}

	function matchTypes(type: GuiType): {
		name: string;
		w: number;
		h: number;
		x: number | undefined;
		y: number | undefined;
		textValue: Option<string | AlignedText>;
		actions: Option<Option<Actions>[]>;
		moveable: boolean;
	} {
		switch (type) {
			case GuiType.Header:
				return {
					name: 'Header',
					w: 20,
					h: 2,
					x: undefined,
					y: undefined,
					moveable: true,
					textValue: { text: '', horizontal: GuiAlign.Left, vertical: GuiAlign.Center },
					actions: null
				};
			case GuiType.BodyText:
				return {
					name: 'Body Text',
					w: 20,
					h: 2,
					x: undefined,
					y: undefined,
					moveable: true,
					textValue: { text: '', horizontal: GuiAlign.Left, vertical: GuiAlign.Center },
					actions: null
				};
			case GuiType.Buttons:
				return {
					name: 'Buttons',
					w: 20,
					h: 2,
					x: 0,
					y: 8,
					moveable: false,
					textValue: null,
					actions: [null, null, null]
				};
			case GuiType.Alert:
				return {
					name: 'Alert',
					w: 20,
					h: 10,
					x: 0,
					y: 0,
					moveable: false,
					textValue: '',
					actions: [
						{
							textValue: 'Ok',
							event: {
								type: EventType.View,
								data: undefined
							}
						}
					]
				};
		}
	}

	function convertViewsToMenu(views: Views): {
		id: string;
		label: number;
		badge: string | undefined;
		disabled: undefined | boolean;
		select: () => void;
		del: (id: string) => void;
	}[] {
		return views.views.map((view, index) => ({
			id: view.id,
			label: index + 1,
			badge: views.current == index ? 'current' : undefined,
			disabled: undefined,
			select: () => {
				views.current = index;
				$views = views;
			},
			del: (id: string) => {
				if ($views.current != 0 && $views.views.length - 1 <= $views.current) $views.current -= 1;
				$views.views = views.views.filter((item) => item.id !== id);
			}
		}));
	}

	function downloadJson() {
		const jsonStr = JSON.stringify($views, null, 2);
		const blob = new Blob([jsonStr], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'data.json';
		a.click();
		URL.revokeObjectURL(url);
	}

	$: disabled = (views: Views, type: GuiType | undefined) => {
		return (
			views.views.length == 0 ||
			(views.views[views.current].rows.find((item) => item.type === type) != undefined ?? true)
		);
	};
	$: submenu = [
		{
			title: 'Message',
			tile: 0,
			list: [
				{
					id: undefined,
					label: 'Header',
					badge: 'Moveable',
					disabled: disabled($views, GuiType.Header),
					select: () => addNewItem(GuiType.Header),
					del: undefined
				},
				{
					id: undefined,
					label: 'Body Text',
					badge: 'Moveable',
					disabled: disabled($views, GuiType.BodyText),
					select: () => addNewItem(GuiType.BodyText),
					del: undefined
				},
				{
					id: undefined,
					label: 'Buttons',
					badge: 'Fixed',
					disabled: disabled($views, GuiType.Buttons),
					select: () => addNewItem(GuiType.Buttons),
					del: undefined
				}
			]
		},
		{
			title: 'Dialog',
			tile: 0,
			list: [
				{
					id: undefined,
					label: 'Alert',
					badge: 'Fixed',
					disabled: disabled($views, GuiType.Alert),
					select: () => addNewItem(GuiType.Alert),
					del: undefined
				},
				{
					id: undefined,
					label: 'Browser',
					badge: 'Not yet Implemented',
					disabled: true,
					select: () => {},
					del: undefined
				}
			]
		},
		{
			title: 'Notifications',
			tile: 0,
			list: [
				{
					id: undefined,
					label: 'LED Event',
					badge: 'Not yet Implemented',
					disabled: true,
					select: () => {},
					del: undefined
				}
			]
		},
		{
			title: 'User Input',
			tile: 0,
			list: [
				{
					id: undefined,
					label: 'Input',
					badge: 'Not yet Implemented',
					disabled: true,
					select: () => {},
					del: undefined
				}
			]
		},
		{
			title: 'Views',
			tile: 1,
			list: [
				...convertViewsToMenu($views),
				{
					id: undefined,
					label: '<i class="fa-solid fa-plus mr-2"></i> Add View',
					badge: undefined,
					disabled: undefined,
					select: () => {
						$views.views.push({ rows: [], id: crypto.randomUUID() });
						$views = $views;
					},
					del: undefined
				}
			]
		},
		{
			title: 'Export',
			tile: 2,
			list: [
				{
					id: undefined,
					label: '<i class="fa-solid fa-file-export mr-2"></i> Download JSON',
					badge: undefined,
					disabled: disabled($views, undefined),
					select: downloadJson,
					del: undefined
				}
			]
		}
	];
</script>

<div
	class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30 {$$props.class ??
		''}"
>
	<AppRail background="bg-transparent" border="border-r border-surface-500/30">
		<AppRailAnchor name="add-items" title="Close" on:click={drawerStore.close} class="lg:hidden">
			<svelte:fragment slot="lead"><i class="fa-solid fa-xmark"></i></svelte:fragment>
			<span>Close</span>
		</AppRailAnchor>
		<AppRailTile bind:group={currentTile} name="add-items" value={0} title="Add Items">
			<svelte:fragment slot="lead"><i class="fa-solid fa-plus"></i></svelte:fragment>
			<span>Add Items</span>
		</AppRailTile>
		<AppRailTile bind:group={currentTile} name="views" value={1} title="Views">
			<svelte:fragment slot="lead"><i class="fa-solid fa-file"></i></svelte:fragment>
			<span>Views</span>
		</AppRailTile>
		<svelte:fragment slot="trail">
			<AppRailTile bind:group={currentTile} name="export" value={2} title="Export">
				<svelte:fragment slot="lead"><i class="fa-solid fa-download"></i></svelte:fragment>
				<span>Export</span>
			</AppRailTile>
		</svelte:fragment>
	</AppRail>
	<!-- Nav -->
	<section class="p-4 pb-20 space-y-4 overflow-y-auto">
		{#each submenu as segment, i}
			{#if segment.tile == currentTile}
				<!-- Title -->
				<p class="font-bold pl-4 text-2xl">{segment.title}</p>
				<!-- List -->
				<ul class="list flex-auto">
					{#each segment.list as { id, label, badge, select, disabled, del }}
						<div class="flex flex-nowrap">
							<button
								{disabled}
								type="button"
								on:click={select}
								class="btn variant-filled {del ? 'wtf' : 'w-full'}"
							>
								<span class="flex-auto text-start">{@html label}</span>
								{#if badge}<span class="badge variant-filled-secondary">{badge}</span>{/if}
							</button>
							{#if del}
								<button
									class="ml-1 btn w-8 variant-filled-error place-self-center"
									style="padding-top: 13px; padding-bottom: 13px;"
									on:click={() => {
										if (del) del(id ?? '');
									}}><i class="fa-solid fa-delete-left"></i></button
								>
							{/if}
						</div>
					{/each}
				</ul>
				<!-- Divider -->
				{#if i + 1 < submenu.filter((item) => item.tile === currentTile).length}
					<hr class="!my-6 opacity-50" />
				{/if}
			{/if}
		{/each}
	</section>
</div>

<style>
	.wtf {
		width: calc(100% - 40px);
	}
</style>
