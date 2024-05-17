<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let text: string;
	export let label: string;
	export let description: string;
</script>

<Dialog.Root>
	<Dialog.Trigger asChild let:builder={dialog}>
		<slot {dialog} />
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>
				Edit {label}
			</Dialog.Title>
			<Dialog.Description>{@html description}</Dialog.Description>
		</Dialog.Header>
		<div class="space-y-1">
			<Label for="text" class="text-right">{label}</Label>
			<Input
				bind:value={text}
				id="text"
				placeholder="Add {label.toLowerCase()}..."
				class="col-span-3"
				type="text"
			/>
		</div>
	</Dialog.Content>
</Dialog.Root>
