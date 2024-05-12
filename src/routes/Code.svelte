<script>
	import { clickToCopyAction } from 'svelte-legos';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-rust';
	import 'prismjs/themes/prism-dark.css';
	import { Check, Copy } from 'lucide-svelte';

	let copied = false;
	let code = `#![no_main]
#![no_std]

// Required for panic handler
extern crate flipperzero_rt;

use core::ffi::CStr;
use flip_ui_macro::flipper_ui;
use flipperzero_rt::{entry, manifest};

// Define the FAP Manifest for this application
manifest!(
	name = "Flipper Zero Rust",
	app_version = 1,
	has_icon = false,
);

// Define the entry function
entry!(main);

// Getting UI data && actions
flipper_ui! {
	App,
	"src/main.json",
	next => next,
	close => close,
}

// Entry point
fn main(_args: Option<&CStr>) -> i32 {
	let mut app = App::create();

	app.show();

	0
}`;

	$: highlightedCode = Prism.highlight(code, Prism.languages.rust, 'rust');

	function handleCopyDone() {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
	}

	function handleCopyError() {
		console.error('Error copying');
	}
</script>

<div class="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
	<div class="flex h-0 flex-row justify-end">
		<button
			class="relative right-4 top-4 z-10 inline-flex h-6 w-6 items-center justify-center rounded-md text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-700 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
			use:clickToCopyAction={code}
			on:copy-done={handleCopyDone}
			on:copy-error={handleCopyError}
		>
			<span class="sr-only">Copy</span>
			{#if copied}
				<Check class="h-3 w-3" tabindex={-1} />
			{:else}
				<Copy class="h-3 w-3" tabindex={-1} />
			{/if}
		</button>
	</div>
	<pre
		bind:innerHTML={highlightedCode}
		contenteditable="false"
		aria-multiline="true"
		class="mb-4 mt-6 !max-h-full overflow-x-auto whitespace-pre-wrap text-nowrap rounded-lg border bg-zinc-950 p-4 py-4 font-mono text-sm text-white dark:bg-zinc-900"></pre>
</div>
