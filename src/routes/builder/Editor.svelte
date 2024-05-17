<script lang="ts">
	import { data } from '$lib/stores';
	import * as Card from '$lib/components/ui/card';
	import { Align, GuiType } from '$lib';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { CircleAlert, Eye, EyeOff, Pencil, SquareChevronLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import LabelDialog from './LabelDialog.svelte';
	import EventDialog from './EventDialog.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import TextDialog from './TextDialog.svelte';
	import LabelItem from './LabelItem.svelte';
</script>

<div class="flex h-full flex-col">
	<div class="pb-2 pt-2">
		{#if $data.views.length > 0}
			<div class="flex items-center justify-between">
				<h2 class="h2">{$data.current + 1}. {$data.views[$data.current].type.toString()}</h2>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder={tooltip}>
						<TextDialog
							bind:text={$data.views[$data.current].data.back_function}
							label="Back Button Event"
							description={`Define here your custom/generic event: <code class="code">none</code>,
								<code class="code">next</code>, <code class="code">back</code>
								or
								<code class="code">close</code>. The Back Button Event will be triggered when
								the back button is pressed.`}
							let:dialog
						>
							<Button builders={[tooltip, dialog]} variant="outline" size="icon"
								><SquareChevronLeft class="h-5 w-5" /></Button
							>
						</TextDialog>
					</Tooltip.Trigger>
					<Tooltip.Content side="left" sideOffset={5}>Back Button Event</Tooltip.Content>
				</Tooltip.Root>
			</div>
		{:else}
			<h2 class="h2">No Views</h2>
		{/if}
	</div>

	<div class="flex h-full flex-col justify-between gap-2">
		{#if $data.views[$data.current]?.type == GuiType.Dialog}
			<LabelItem bind:label={$data.views[$data.current].data.header} type="Header" />
			<LabelItem bind:label={$data.views[$data.current].data.text} type="Text" />
			<div class="grid w-full grid-cols-3 gap-2">
				{#each $data.views[$data.current]?.data.buttons as event}
					<Card.Root class="w-full {!event ? 'opacity-50' : ''}">
						<Card.Header>
							<Card.Title>
								<div class="flex items-center justify-between">
									<span class="items-center truncate">
										Button
										{#if event && event.function}
											<Badge>{event.function}</Badge>
										{/if}
									</span>
									<div
										class="flex flex-col-reverse items-center space-y-1 xl:flex-row xl:space-x-1"
									>
										<EventDialog bind:event let:dialog>
											<Button size="icon" variant="ghost" disabled={!event} builders={[dialog]}>
												<Pencil class="h-4 w-4" />
											</Button>
										</EventDialog>
										<Button
											size="icon"
											variant="ghost"
											on:click={() => {
												if (!event) {
													event = {
														text: '',
														function: ''
													};
												} else {
													event = null;
												}
											}}
										>
											{#if event}
												<Eye class="h-4 w-4" />
											{:else}
												<EyeOff class="h-4 w-4" />
											{/if}
										</Button>
									</div>
								</div>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="grid">
								<span class="truncate"> {event ? event.text : 'hidden'} </span>
							</div>
						</Card.Content>
					</Card.Root>
				{/each}
			</div>
		{:else if $data.views[$data.current]?.type == GuiType.Alert}
			<Card.Root class="w-full">
				<Card.Header>
					<Card.Title>
						<div class="flex items-center justify-between">
							<span> Text </span>
							<TextDialog
								bind:text={$data.views[$data.current].data.text}
								label="Text"
								description="Edit the text of the Alert View."
								let:dialog
							>
								<Button size="icon" variant="ghost" builders={[dialog]}>
									<Pencil class="h-4 w-4" />
								</Button>
							</TextDialog>
						</div>
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="grid h-12">
						<span class="truncate">{$data.views[$data.current]?.data.text}</span>
					</div>
				</Card.Content>
			</Card.Root>
			<Card.Root class="w-full pt-1">
				<Card.Header>
					<Card.Title>
						<div class="flex items-center justify-between">
							<span class="items-center truncate pb-1">
								Button
								{#if $data.views[$data.current].data && $data.views[$data.current].data.function}
									<Badge>{$data.views[$data.current].data.function}</Badge>
								{/if}
							</span>
							<TextDialog
								bind:text={$data.views[$data.current].data.function}
								label="Button Event"
								description={`Define here your button text and custom/generic event: <code class="code">none</code>,
								<code class="code">next</code>, <code class="code">back</code>
								or
								<code class="code">close</code>. The Button Event will be triggered when the Ok/Middle button is
								pressed.`}
								let:dialog
							>
								<Button size="icon" variant="ghost" builders={[dialog]}>
									<Pencil class="h-4 w-4" />
								</Button>
							</TextDialog>
						</div>
					</Card.Title>
				</Card.Header>
				<Card.Content>Ok</Card.Content>
			</Card.Root>
		{:else if $data.views.length > 0}
			<Alert.Root variant="destructive">
				<CircleAlert class="h-4 w-4" />
				<Alert.Title>Error</Alert.Title>
				<Alert.Description
					>This View isn't implemented yet. Just wait until I've done my work!</Alert.Description
				>
			</Alert.Root>
		{/if}
	</div>
</div>
