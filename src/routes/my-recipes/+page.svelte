<script lang="ts">
	import { get_all_recipes, delete_recipe } from "$lib/data";
	import TrashCanIcon from "$lib/icons/trash_can_icon.svelte";
	import { get_url } from "$lib/utils";
	import AddRecipeFloater from "$lib/views/AddRecipeFloater.svelte";
	import Popup from "$lib/views/Popup.svelte";
	import Toolbar from "$lib/views/Toolbar.svelte";

	let recipes = $state(get_all_recipes().reverse());
	let recipe_to_delete = $state<string | null>(null);
	let is_selected = true;
</script>

<Toolbar title="My Saved Recipes" back_path="/" />

<main class="list">
	{#each recipes as recipe}
		<div class="flex-row" class:selected={is_selected}>
			<a
				class="grow vertically-centered p0_5"
				href={get_url(`/recipe`, { url: recipe.url })}
			>
				{recipe.title || "<missing title>"}
			</a>

			<button
				class="shrink"
				onclick={(event) => {
					event.stopPropagation();
					recipe_to_delete = recipe.url;
				}}
				title="Delete"
				aria-label="Delete"
			>
				<TrashCanIcon />
			</button>
		</div>
	{:else}
		<div class="recipe-row">No recipes yet</div>
	{/each}

	<AddRecipeFloater />

	{#if recipe_to_delete}
		<Popup
			text="Are you sure?"
			accept={() => {
				if (recipe_to_delete) {
					recipes = delete_recipe(recipes, recipe_to_delete);
					recipe_to_delete = null;
				}
			}}
			cancel={() => {
				recipe_to_delete = null;
			}}
		/>
	{/if}
</main>
