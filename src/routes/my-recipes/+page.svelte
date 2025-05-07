<script lang="ts">
	import { get_all_recipes, delete_recipe } from "$lib/data";
	import { get_url } from "$lib/utils";
	import AddRecipeFloater from "$lib/views/AddRecipeFloater.svelte";
	import Toolbar from "$lib/views/Toolbar.svelte";

	let { current_url } = $props<{
		current_url: string | null;
		onBack(): void;
		onOpenUrl(new_url: string): void;
	}>();

	let recipes = $state(get_all_recipes().reverse());
</script>

<Toolbar title="My Saved Recipes" back_path="/" />

<main class="flex-col">
	{#each recipes as recipe}
		<div
			class="recipe-row"
			class:selected={recipe.url && recipe.url === current_url}
		>
			<a
				class="grow vertically-centered p0_5"
				href={get_url(`/recipe`, { url: recipe.url })}
			>
				{recipe.title || "<missing title>"}
			</a>

			<button
				class="pink shrink"
				onclick={(event) => {
					event.stopPropagation();
					recipes = delete_recipe(recipes, recipe.url);
				}}
			>
				Delete
			</button>
		</div>
	{:else}
		<div class="recipe-row">No recipes yet</div>
	{/each}

	<AddRecipeFloater />
</main>

<style lang="scss">
	.recipe-row {
		display: flex;
		gap: 5px;
		align-items: stretch;
		background-color: #1a1a1a;
	}

	.recipe-row:nth-child(even) {
		background: black;
	}

	.recipe-row.selected {
		background-color: red;
	}
</style>
