<script>
	import { CodeBlock } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Homepage" />
</svelte:head>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-8 flex flex-col lg:w-2/3 w-11/12 pt-6 pb-6">
		<h1 class="h1">Welcome to <span class="rotate-180 inline-block">flip</span></h1>
		<blockquote class="blockquote">The UI Builder for the Flipper Zero</blockquote>
		<p>Effortlessly design and export user interfaces for your Flipper Zero applications.</p>

		<h2 class="h2">Getting Started</h2>
		<p>
			Begin by designing your UI using our intuitive builder. Once you are satisfied with the
			design, export it as a JSON file. This JSON can be directly used with the specified Rust crate
			to integrate into your Flipper Zero application.
		</p>

		<h3 class="h3">Variables</h3>
		<p>
			In all Text Input Fields, external variables that you have to define in the Rust code and
			include in the proc macro can be referenced to in <code class="code">{'{'}{'}'}</code> - brackets.
		</p>
		<h3 class="h3">Actions</h3>
		<p>
			All buttons can have actions. An action can either be switching to a view or a custom function
			you defined in the Rust proc macro code. The syntax is:
			<code class="code">function_name(optional_params)</code>
		</p>
		<h3 class="h3">UI Items</h3>
		<p>
			The UI operates on the principle of views. Every view can have UI items (found under the UI <code
				class="code">Add Items</code
			>
			- Tab) of one category. Using the Edit (pen icon) button, you can edit the already described properties
			(plus, on Header and Body Text, you can also set text alignment). You can also set the position
			of
			<code class="code">Moveable</code> items by moving them.
		</p>

		<h3 class="h3">Integration with Rust</h3>
		<p>
			To integrate the exported JSON into your Flipper Zero app, use our dedicated Rust crate.
			Simply include the crate in your project and load the JSON to render the UI components (don't
			forget to pass in your functions and variables).
		</p>
		<h3 class="h3">Example:</h3>
		<CodeBlock
			language="rust"
			code={`// Import the flip_ui crate
use flip_ui;

fn main() {
	// Load the exported UI JSON file
	let ui = flip_ui::load_from_json("path/to/your/ui.json").expect("Failed to load UI");

	// Initialize the UI with the necessary variables and functions
	// Replace \`your_function\` and \`your_variable\` with actual implementations
	ui.init_with(|builder| {
		builder
			.function("your_function_name", your_function)
			.variable("your_variable_name", your_variable)
	});

	// Add application-specific logic here
}
`}
		></CodeBlock>
	</div>
</div>
