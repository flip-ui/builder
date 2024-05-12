<script lang="ts">
	import Code from './Code.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Homepage" />
</svelte:head>
<div class="container mx-auto flex max-w-6xl flex-col space-y-8 p-4">
	<h1 class="h1">Welcome to <span class="inline-block rotate-180">flip-ui</span></h1>
	<blockquote class="blockquote">The UI Builder for the Flipper Zero</blockquote>
	<p>Effortlessly design and export user interfaces for your Flipper Zero applications.</p>

	<h2 class="h2">Getting Started</h2>
	<p>
		Begin by designing your UI using our intuitive builder. Once you are satisfied with the design,
		export it as a JSON file. This JSON can be directly used with the specified Rust crate to
		integrate into your Flipper Zero application.
	</p>

	<h3 class="h3">Events</h3>
	<p>
		All buttons can have events. An event can be a function you defined in the Rust proc macro code
		or a predefined event, which currently are:
		<code class="code">next</code>, <code class="code">back</code> and
		<code class="code">close</code>.
	</p>
	<h3 class="h3">UI Items</h3>
	<p>
		The UI operates on the principle of views. Every view can have UI items (found under the UI <code
			class="code">Add Items</code
		>
		- Tab) of one category. Using the Edit (pen icon) button, you can edit the already described properties
		(plus, on Header and Body Text, you can also set text alignment). You can also set the position of
		<code class="code">Moveable</code> items by moving them.
	</p>

	<h3 class="h3">Integration with Rust</h3>
	<p>
		To integrate the exported JSON into your Flipper Zero app, use our dedicated Rust crate. Simply
		include the crate in your project and load the JSON to render the UI components (don't forget to
		pass in your functions).
	</p>
	<h3 class="h3">Example:</h3>

	<Code />
</div>
