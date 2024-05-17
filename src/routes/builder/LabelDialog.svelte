<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Align, type Label } from '$lib';
	import * as T from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';

	export let label: Label;
	export let type: 'Header' | 'Text';

	function setHorizontal(align: string) {
		label.horizontal = align as Align;
	}

	function setVertical(align: string) {
		label.vertical = align as Align;
	}
</script>

<Dialog.Root>
	<Dialog.Trigger asChild let:builder={dialog}>
		<slot {dialog} />
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit {type}</Dialog.Title>
			<Dialog.Description>
				Edit the {type} properties. You can change the text, position and alignment of it.
			</Dialog.Description>
			<div class="grid gap-4">
				<div class="space-y-1">
					<T.Label for="text" class="text-right">Text</T.Label>
					<Input
						bind:value={label.text}
						id="text"
						placeholder="Add text..."
						class="col-span-3"
						type="text"
					/>
				</div>
				<div class="grid grid-cols-2 space-x-1">
					<div class="space-y-1">
						<T.Label for="x" class="text-right">x (0-128)</T.Label>
						<Input
							bind:value={label.x}
							id="x"
							placeholder="Add x..."
							class="col-span-3"
							type="number"
						/>
					</div>
					<div class="space-y-1">
						<T.Label for="y" class="text-right">y (0-64)</T.Label>
						<Input
							bind:value={label.y}
							id="y"
							placeholder="Add y..."
							class="col-span-3"
							type="number"
						/>
					</div>
				</div>
				<div class="grid grid-cols-2 space-x-1">
					<div class="space-y-1">
						<T.Label for="horizontal" class="text-right">Horizontal</T.Label>
						<Select.Root selected={{ value: label.horizontal, label: label.horizontal }}>
							<Select.Trigger id="horizontal" class="w-full">
								<Select.Value placeholder="Select Alignment" />
							</Select.Trigger>
							<Select.Content>
								{#each Object.keys(Align) as align}
									<Select.Item value={align} on:click={() => setHorizontal(align)}
										>{align}</Select.Item
									>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
					<div class="space-y-1">
						<T.Label for="vertical" class="text-right">Vertical</T.Label>
						<Select.Root selected={{ value: label.vertical, label: label.vertical }}>
							<Select.Trigger id="vertical" class="w-full">
								<Select.Value placeholder="Select Alignment" />
							</Select.Trigger>
							<Select.Content>
								{#each Object.keys(Align) as align}
									<Select.Item value={align} on:click={() => setVertical(align)}
										>{align}</Select.Item
									>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
				</div>
			</div>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
