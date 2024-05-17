<script lang="ts">
	import Code from './Code.svelte';
</script>

<svelte:head>
	<title>flip</title>
	<meta name="description" content="Homepage" />
</svelte:head>

<div class="container mx-auto flex max-w-6xl flex-col space-y-8 p-4">
	<h1 class="h1">Welcome to <span class="inline-block rotate-180">flip</span></h1>
	<blockquote class="blockquote">The UI Builder for the Flipper Zero</blockquote>
	<p>Effortlessly design and export user interfaces for your Flipper Zero applications.</p>

	<h2 class="h2">Getting Started</h2>
	<p>
		Begin by designing your UI using our intuitive builder. Once you are satisfied with the design,
		export it as a JSON file. This JSON can be directly used with the specified Rust crate to
		integrate into your Flipper Zero application.
	</p>

	<h3 class="h3">Views</h3>
	<p>
		Every possible user interface is build from multiple Views. That's like a slide a in a
		presentation and multiple Slides are building the whole presentation. A View can be different
		types: Either a <code class="code">Message</code>,
		<code class="code">Alert</code>, <code class="code">Browser</code> or
		<code class="code">Input</code>. Every View comes with their own UI Elements which can be hidden
		(Message) or just edited (All).
	</p>

	<h3 class="h3">Events</h3>
	<p>
		All buttons can have events. An event can be a function you defined in your Rust code or a
		predefined event (in the proc macro), which currently are:
		<code class="code">none</code>, <code class="code">next</code>, <code class="code">back</code>
		and
		<code class="code">close</code>. Events can do internal logic or switch to a certain view e.g.
		using <code class="code">next</code> for going to the next View.
	</p>

	<h3 class="h3">Integration with Rust</h3>
	<p>
		To integrate the exported JSON into your Flipper Zero app, use <a
			href="https://github.com/flip-ui/flip-ui-rs"
			target="_blank"
			class="text-primary underline underline-offset-4">our dedicated Rust crate</a
		>. Simply include the crate in your project and load the JSON to render the UI components (don't
		forget to pass in your functions).
	</p>
	<h3 class="h3">Example:</h3>

	<Code />
</div>
