<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { type Event } from '$lib';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let event: Event;
</script>

<Dialog.Root>
	<Dialog.Trigger asChild let:builder={dialog}>
		<slot {dialog} />
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Button Event</Dialog.Title>
			<Dialog.Description>
				Define here your button text and custom/generic event: <code class="code">none</code>,
				<code class="code">next</code>, <code class="code">back</code>
				or
				<code class="code">close</code>. The Button Event will be triggered when the button is
				pressed.
			</Dialog.Description>
			<div class="grid gap-4">
				<div class="space-y-1">
					<Label for="text" class="text-right">Text</Label>
					<Input
						bind:value={event.text}
						id="text"
						placeholder="Add text..."
						class="col-span-3"
						type="text"
					/>
				</div>
				<div class="space-y-1">
					<Label for="function" class="text-right">Event</Label>
					<Input
						bind:value={event.function}
						id="function"
						placeholder="Add event..."
						class="col-span-3"
						type="text"
					/>
				</div>
			</div>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
