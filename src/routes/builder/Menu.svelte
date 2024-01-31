<script lang="ts">
	import { gridController, views } from '$lib/stores';
	import { AppRail, AppRailAnchor, AppRailTile, getDrawerStore } from '@skeletonlabs/skeleton';
	import { Align, GuiType, type Option, type Views, type Data, type View } from './../../lib/types';
	import { areItemsColliding } from '$lib/utils';

	const drawerStore = getDrawerStore();

	let currentTile: number = 0;

	function addNewView(type: GuiType) {
		let newView = matchTypes(type);

		const pos = $gridController.getFirstAvailablePosition(newView.w, newView.h);
		if (newView.x == 0) newView.x = pos?.x || 0;
		if (newView.y == 0) newView.y = pos?.y || 0;

		if (!areItemsColliding(newView, $views.pages[$views.current].page)) {
			$views.pages[$views.current].page.push(newView);
			$views.pages[$views.current] = $views.pages[$views.current];
		}
	}

	function matchTypes(type: GuiType): View {
		switch (type) {
			case GuiType.Header:
				return {
					id: crypto.randomUUID(),
					name: 'Header',
					type: GuiType.Header,
					w: 20,
					h: 2,
					x: 0,
					y: 0,
					moveable: true,
					data: {
						text_value: '',
						horizontal: Align.Left,
						vertical: Align.Center,
						actions: null
					}
				};
			case GuiType.BodyText:
				return {
					id: crypto.randomUUID(),
					name: 'Body Text',
					type: GuiType.BodyText,
					w: 20,
					h: 2,
					x: 0,
					y: 0,
					moveable: true,
					data: {
						text_value: '',
						horizontal: Align.Left,
						vertical: Align.Center,
						actions: null
					}
				};
			case GuiType.Buttons:
				return {
					id: crypto.randomUUID(),
					name: 'Buttons',
					type: GuiType.Buttons,
					w: 20,
					h: 2,
					x: 0,
					y: 8,
					moveable: false,
					data: {
						text_value: null,
						horizontal: null,
						vertical: null,
						actions: [null, null, null]
					}
				};
			case GuiType.Alert:
				return {
					id: crypto.randomUUID(),
					name: 'Alert',
					type: GuiType.Alert,
					w: 20,
					h: 10,
					x: 0,
					y: 0,
					moveable: false,
					data: {
						text_value: null,
						horizontal: null,
						vertical: null,
						actions: [
							{
								text_value: 'Ok',
								event: {
									View: 0
								}
							}
						]
					}
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
		return views.pages.map((view, index) => ({
			id: view.id,
			label: index + 1,
			badge: views.current == index ? 'current' : undefined,
			disabled: undefined,
			select: () => {
				views.current = index;
				$views = views;
			},
			del: (id: string) => {
				if ($views.current != 0 && $views.pages.length - 1 <= $views.current) $views.current -= 1;
				$views.pages = views.pages.filter((item) => item.id !== id);
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
			views.pages.length == 0 ||
			(views.pages[views.current].page.find((view) => view.type === type) != undefined ?? true)
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
					select: () => addNewView(GuiType.Header),
					del: undefined
				},
				{
					id: undefined,
					label: 'Body Text',
					badge: 'Moveable',
					disabled: disabled($views, GuiType.BodyText),
					select: () => addNewView(GuiType.BodyText),
					del: undefined
				},
				{
					id: undefined,
					label: 'Buttons',
					badge: 'Fixed',
					disabled: disabled($views, GuiType.Buttons),
					select: () => addNewView(GuiType.Buttons),
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
					select: () => addNewView(GuiType.Alert),
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
						$views.pages.push({ page: [], id: crypto.randomUUID() });
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
