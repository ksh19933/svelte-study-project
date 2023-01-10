<script>
	import TextMaker from "../modules/TextMaker.svelte";
	import Example from "../modules/Example.svelte";
	import Exel from "../modules/Exel.svelte";
	import ImageMaker from "../modules/ImageMaker.svelte";
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="template">
	<Exel/>
	<div class="row-24 row-align">
		<TextMaker />
	</div>
	<div>
		<ImageMaker />
	</div>
	<Example/>
</div>

<style>
	.template{
		display: grid;
		gap: 24px;
	}
	.row-align{
		align-items: flex-start;
	}
</style>
