<script>
	import '../app.pcss';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Sun, Moon, Menu } from 'lucide-svelte';
	import { page } from '$app/stores';
	import SideBar from './builder/SideBar.svelte';
</script>

<ModeWatcher disableTransitions={false} />

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container max-w-full pl-4 pr-4">
		<div class="flex h-[70px] items-center justify-between gap-3">
			<div class="flex items-center gap-1.5">
				<nav class="flex items-center gap-6 text-sm">
					<Sheet.Root>
						<Sheet.Trigger asChild let:builder hidden={$page.url.pathname != '/builder'}>
							<Button
								builders={[builder]}
								variant="ghost"
								size="icon"
								class="rounded-lg md:hidden {$page.url.pathname == '/builder' ? 'flex' : 'hidden'}"
								aria-label="Models"
							>
								<Menu scale="5" />
							</Button>
						</Sheet.Trigger>
						<Sheet.Content side="left" class="w-[400px]">
							<Sheet.Header class="h-full">
								<!-- <Sheet.Title>Are you sure absolutely sure?</Sheet.Title> -->
								<Sheet.Description class="flex h-full">
									<SideBar mobile />
								</Sheet.Description>
							</Sheet.Header>
						</Sheet.Content>
					</Sheet.Root>
					<a
						href="/"
						class="{$page.url.pathname == '/'
							? 'text-foreground'
							: 'text-foreground/60'}  transition-colors hover:text-foreground/80"
						><Avatar.Root>
							<Avatar.Image src="favicon.png" alt="flip-ui" />
							<Avatar.Fallback>FP</Avatar.Fallback>
						</Avatar.Root></a
					>
					<a
						href="/builder"
						class="{$page.url.pathname == '/builder'
							? 'text-foreground'
							: 'text-foreground/60'} transition-colors hover:text-foreground/80">Builder</a
					>
					<a
						href="https://github.com/flip-ui"
						target="_blank"
						class="text-foreground/60 transition-colors hover:text-foreground/80">Github</a
					>
				</nav>
			</div>
			<div class="flex items-center justify-end gap-2.5">
				<Button on:click={toggleMode} variant="outline" size="icon">
					<Sun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</div>
		</div>
	</div>
</header>

<slot />
