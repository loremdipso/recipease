<script lang="ts">
	import Toolbar from "$lib/views/Toolbar.svelte";
	import { get_url } from "$lib/utils";
	import AddRecipeFloater from "$lib/views/AddRecipeFloater.svelte";
	import Help from "$lib/views/Help.svelte";
</script>

<Toolbar title="RecipEase">
	{#snippet extra_buttons()}
		<a class="button-like" href={get_url(`/my-recipes`)}> My Recipes </a>
	{/snippet}
</Toolbar>

<main>
	<Help />
	<AddRecipeFloater />
</main>
