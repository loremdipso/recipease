<script lang="ts">
	import Toolbar from "$lib/views/Toolbar.svelte";
	import { get_url } from "$lib/utils";
	import AddRecipeFloater from "$lib/views/AddRecipeFloater.svelte";
	import Help from "$lib/views/Help.svelte";
	import RecipesButton from "$lib/views/buttons/RecipesButton.svelte";
	import CurrentListButton from "$lib/views/buttons/CurrentListButton.svelte";
	import ShoppingListsButton from "$lib/views/buttons/ShoppingListsButton.svelte";
</script>

<Toolbar title="RecipEase">
	{#snippet extra_buttons()}
		<CurrentListButton />
		<ShoppingListsButton />
		<RecipesButton />
	{/snippet}
</Toolbar>

<main>
	<Help />
	<AddRecipeFloater />
</main>
