<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Layers, Download, CircleX } from 'lucide-svelte';
	import { data } from '$lib/stores';
	import { GuiType, type Data } from '$lib';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { onMount } from 'svelte';

	export let backdrop = false;

	function convertDataToMenu(data: Data) {
		return data.views.map((view, index) => ({
			label: index + 1 + '. ' + view.type.toString(),
			badge: data.current == index ? 'current' : undefined,
			dropdown: undefined,
			disabled: false,
			onclick: () => {
				$data.current = index;
			},
			del: (i: number) => {
				if (data.current != 0 && data.views.length - 1 <= data.current) $data.current -= 1;
				$data.views.splice(i, 1);
				$data = $data;
			}
		}));
	}

	function replacer(key: string, value: any) {
		if (key === 'current') {
			return undefined;
		}
		if (key === 'views' && Array.isArray(value)) {
			return value.map((view) => {
				if (view && typeof view === 'object' && 'type' in view && 'data' in view) {
					return { [view.type.toLowerCase()]: view.data };
				}
				return view;
			});
		}
		return value;
	}

	function downloadJson() {
		const jsonStr = JSON.stringify($data, replacer, 2);
		const blob = new Blob([jsonStr], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'main.json';
		a.click();
		URL.revokeObjectURL(url);
	}

	let currentTile = -1;
	$: submenu = [
		{
			title: 'Views',
			tile: 0,
			list: [
				...convertDataToMenu($data),
				{
					label: 'Add View',
					badge: undefined,
					disabled: false,
					dropdown: {
						title: 'Type',
						items: [
							{
								label: 'Dialog',
								disabled: false,
								onclick: () => {
									$data.views.push({
										data: {
											header: null,
											text: null,
											buttons: [null, null, null],
											back_function: 'close'
										},
										type: GuiType.Dialog
									});
									$data = $data;
								}
							},
							{
								label: 'Alert',
								disabled: false,
								onclick: () => {
									$data.views.push({
										data: {
											text: '',
											function: '',
											back_function: 'close'
										},
										type: GuiType.Alert
									});
									$data = $data;
								}
							},
							{
								label: 'Browser',
								disabled: true,
								onclick: () => {}
							},
							{
								label: 'Input',
								disabled: true,
								onclick: () => {}
							}
						]
					},
					onclick: () => {},
					del: undefined
				}
			]
		},
		{
			title: 'Export',
			tile: 1,
			list: [
				{
					label: 'Download JSON',
					badge: undefined,
					disabled: false,
					dropdown: undefined,
					onclick: downloadJson,
					del: undefined
				}
			]
		}
	];
	onMount(() => {
		currentTile = 0;
	});
</script>

<div class="grid h-full grid-cols-[auto_1fr] text-black dark:text-white">
	<nav
		class="flex flex-col gap-1 border-r p-2 {backdrop
			? 'bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/45'
			: ''} "
	>
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<Button
					variant="ghost"
					size="icon"
					class="rounded-lg {currentTile == 0
						? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
						: ''}"
					aria-label="Models"
					builders={[builder]}
					on:click={() => (currentTile = 0)}
				>
					<Layers class="size-5" />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content side="right" sideOffset={5}>Views</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<Button
					variant="ghost"
					size="icon"
					class="rounded-lg {currentTile == 1
						? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
						: ''}"
					aria-label="API"
					builders={[builder]}
					on:click={() => (currentTile = 1)}
				>
					<Download class="size-5" />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content side="right" sideOffset={5}>Export</Tooltip.Content>
		</Tooltip.Root>
	</nav>
	<nav
		class="grid w-[280px] gap-1 overflow-y-auto {backdrop
			? 'border-r bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/20'
			: ''}"
	>
		<div class="space-y-4 overflow-y-auto p-4 pb-20">
			{#each submenu as segment, i (i)}
				{#if segment.tile == currentTile}
					<!-- Title -->
					<p class="h3">{segment.title}</p>
					<!-- List -->
					<ul class="flex-auto">
						{#each segment.list as { label, badge, onclick, dropdown, disabled, del }, i}
							<div class="flex flex-nowrap space-y-2">
								{#if dropdown}
									<DropdownMenu.Root>
										<DropdownMenu.Trigger class="w-full" asChild let:builder>
											<Button
												builders={[builder]}
												{disabled}
												variant="outline"
												type="button"
												on:click={onclick}
												class="m-2 w-full"
												><span class="flex-auto text-start">{@html label}</span>
											</Button>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content align="start" sameWidth>
											<DropdownMenu.Group>
												<DropdownMenu.Label>{dropdown.title}</DropdownMenu.Label>
												<DropdownMenu.Separator />
												{#each dropdown.items as item}
													<DropdownMenu.Item disabled={item.disabled} on:click={item.onclick}
														>{item.label}</DropdownMenu.Item
													>
												{/each}
											</DropdownMenu.Group>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								{:else}
									<Button
										{disabled}
										variant="outline"
										type="button"
										on:click={onclick}
										class="m-2 w-full"
									>
										<span class="flex-auto text-start">{@html label}</span>
										{#if badge}<Badge>{badge}</Badge>{/if}
									</Button>
								{/if}

								{#if del}
									<Button variant="destructive" size="icon" class="mr-2 p-2" on:click={() => del(i)}
										><CircleX /></Button
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
		</div>
	</nav>
</div>
