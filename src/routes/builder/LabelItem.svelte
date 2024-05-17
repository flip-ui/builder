<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Align, type Option } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import LabelDialog from './LabelDialog.svelte';
	import { type Label } from '$lib';
	import { Eye, EyeOff, Pencil } from 'lucide-svelte';

	export let label: Option<Label>;
	export let type: 'Header' | 'Text';

	$: verticalAlign = (align: Align | undefined) => {
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
			default:
				return '';
		}
	};

	$: horizontalAlign = (align: Align | undefined) => {
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
			default:
				return '';
		}
	};
</script>

<Card.Root class="w-full {!label ? 'opacity-50' : ''}">
	<Card.Header>
		<Card.Title>
			<div class="flex items-center justify-between">
				<span>
					{type}
					{#if label}
						<Badge>x: {label?.x}</Badge>
						<Badge>y: {label?.y}</Badge>
					{/if}
				</span>
				<div class="flex space-x-1">
					{#if label}
						<LabelDialog bind:label {type} let:dialog>
							<Button size="icon" variant="ghost" builders={[dialog]}>
								<Pencil class="h-4 w-4" />
							</Button>
						</LabelDialog>
					{:else}
						<Button size="icon" variant="ghost" disabled={true}>
							<Pencil class="h-4 w-4" />
						</Button>
					{/if}
					<Button
						size="icon"
						variant="ghost"
						on:click={() => {
							if (!label) {
								label = {
									text: '',
									x: type == 'Header' ? 0 : 64,
									y: 0,
									horizontal: Align.Left,
									vertical: Align.Top
								};
							} else {
								label = null;
							}
						}}
					>
						{#if label}
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
		<div class="grid {horizontalAlign(label?.horizontal)} {verticalAlign(label?.vertical)} h-12">
			<span class="truncate">{label ? label.text : 'hidden'}</span>
		</div>
	</Card.Content>
</Card.Root>
