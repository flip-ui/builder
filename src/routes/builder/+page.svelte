<script>
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Plus, Layers, Download } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Builder</title>
	<meta name="description" content="Website's specific UI-Builder" />
</svelte:head>

<div class="grid w-full pl-[336px]">
	<aside
		class="inset-y fixed left-0 z-20 flex h-full flex-col border-b border-border/40 bg-background/65 backdrop-blur supports-[backdrop-filter]:bg-background/30"
	>
		<div class="grid grid-cols-[auto_1fr]">
			<nav class="grid gap-1 p-2">
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<Button
							variant="ghost"
							size="icon"
							class="rounded-lg border border-input bg-muted"
							aria-label="Playground"
							builders={[builder]}
						>
							<Plus class="size-5" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content side="right" sideOffset={5}>Add Items</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<Button
							variant="ghost"
							size="icon"
							class="rounded-lg"
							aria-label="Models"
							builders={[builder]}
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
							class="rounded-lg"
							aria-label="API"
							builders={[builder]}
						>
							<Download class="size-5" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content side="right" sideOffset={5}>Export</Tooltip.Content>
				</Tooltip.Root>
			</nav>
			<nav class="grid w-[280px] gap-1 overflow-y-auto p-2">
				<Button>ASD</Button>
			</nav>
		</div>
	</aside>
	<div class="flex flex-col"></div>
</div>
