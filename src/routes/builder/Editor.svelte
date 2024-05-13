<script lang="ts">
	import { data } from '$lib/stores';
	import * as Card from '$lib/components/ui/card';
	import { Align, GuiType } from '$lib';
	import * as ContextMenu from '$lib/components/ui/context-menu';
</script>

<div class="flex h-full flex-col">
	{#if $data.views.length > 0}
		<h2 class="h2">{$data.current + 1}. {$data.views[$data.current].type.toString()}</h2>
	{:else}
		<h2 class="h2">No Views</h2>
	{/if}

	<div class="flex h-full flex-col justify-between gap-2">
		{#if $data.views[$data.current]?.type == GuiType.Dialog}
			<ContextMenu.Root>
				{@const headerShown = $data.views[$data.current]?.data.header}
				<ContextMenu.Trigger>
					<Card.Root class="w-full {!headerShown ? 'opacity-50' : ''}">
						<Card.Header>
							<Card.Title>Header</Card.Title>
						</Card.Header>
						<Card.Content>
							{headerShown ? $data.views[$data.current]?.data.header.text : 'hidden'}
						</Card.Content>
					</Card.Root>
				</ContextMenu.Trigger>
				<ContextMenu.Content>
					<ContextMenu.CheckboxItem
						checked={headerShown}
						on:click={() => {
							if (!headerShown) {
								$data.views[$data.current].data.header = {
									text: '',
									x: 0,
									y: 0,
									vertical: Align.Left,
									horizontal: Align.Top
								};
							} else {
								$data.views[$data.current].data.header = null;
							}
						}}>Shown</ContextMenu.CheckboxItem
					>
					<ContextMenu.Item inset disabled={!headerShown}>Edit</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Root>
			<ContextMenu.Root>
				{@const textShown = $data.views[$data.current]?.data.text}
				<ContextMenu.Trigger>
					<Card.Root class="w-full {!textShown ? 'opacity-50' : ''}">
						<Card.Header>
							<Card.Title>Text</Card.Title>
						</Card.Header>
						<Card.Content>
							{textShown ? $data.views[$data.current]?.data.text.text : 'hidden'}
						</Card.Content>
					</Card.Root>
				</ContextMenu.Trigger>
				<ContextMenu.Content>
					<ContextMenu.CheckboxItem
						checked={textShown}
						on:click={() => {
							if (!textShown) {
								$data.views[$data.current].data.text = {
									text: '',
									x: 0,
									y: 20,
									vertical: Align.Left,
									horizontal: Align.Top
								};
							} else {
								$data.views[$data.current].data.text = null;
							}
						}}>Shown</ContextMenu.CheckboxItem
					>
					<ContextMenu.Item inset disabled={!textShown}>Edit</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Root>
			<div class="grid w-full grid-cols-3 gap-2">
				{#each $data.views[$data.current]?.data.buttons as button}
					<ContextMenu.Root>
						<ContextMenu.Trigger>
							<Card.Root class={!button ? 'opacity-50' : ''}>
								<Card.Header>
									<Card.Title>Button</Card.Title>
								</Card.Header>
								<Card.Content>
									{button ? button.text : 'hidden'}
								</Card.Content>
							</Card.Root>
						</ContextMenu.Trigger>
						<ContextMenu.Content>
							<ContextMenu.CheckboxItem
								checked={button}
								on:click={() => {
									if (!button) {
										button = {
											text: '',
											function: ''
										};
									} else {
										button = null;
									}
								}}>Shown</ContextMenu.CheckboxItem
							>
							<ContextMenu.Item inset disabled={!button}>Edit</ContextMenu.Item>
						</ContextMenu.Content>
					</ContextMenu.Root>
				{/each}
			</div>
		{/if}
	</div>
</div>
