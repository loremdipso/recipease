<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import {
		find_recipe_by_url,
		get_all_recipes,
		get_shopping_list,
		update_shopping_list,
	} from "$lib/data";
	import CloseIcon from "$lib/icons/close_icon.svelte";
	import { get_ingredients } from "$lib/parser";
	import type { IIngredient, IRecipe, IShoppingList } from "$lib/types";
	import { get_query_param, is_number } from "$lib/utils";
	import AddRecipeFloater from "$lib/views/AddRecipeFloater.svelte";
	import Collapsible from "$lib/views/Collapsible.svelte";
	import Overlay from "$lib/views/Overlay.svelte";
	import RecipePreview from "$lib/views/RecipePreview.svelte";
	import { onMount } from "svelte";

	let shopping_list = $state<IShoppingList | null>(null);

	let all_recipes = $state(get_all_recipes().reverse());
	let data = $derived<{
		errors: string[];
		ingredients: IIngredient[];
	}>(
		shopping_list
			? get_ingredients(
					$state.snapshot(shopping_list),
					$state.snapshot(all_recipes)
				)
			: { errors: [], ingredients: [] }
	);

	onMount(() => {
		try_load();
	});

	afterNavigate(() => {
		try_load();
	});

	$effect(() => {
		if (shopping_list && shopping_list.id >= 0) {
			update_shopping_list(shopping_list);
		}
	});

	function try_load() {
		if (shopping_list) {
			return;
		}

		let maybe_id = get_query_param("id");
		if (maybe_id !== null && is_number(maybe_id)) {
			shopping_list = get_shopping_list(Number(maybe_id));
		}
	}

	let recipe_to_preview = $state<IRecipe | null>(null);
</script>

<main>
	{#if shopping_list}
		<div class="flex-col gap1">
			<h1 class="grow">{shopping_list.name}</h1>

			<div class="card">
				<h2>Recipes</h2>
				{#if shopping_list}
					<div class="list flex-col">
						{#each shopping_list.items as item}
							<button
								class="flex-row"
								onclick={(event) => {
									event.stopPropagation();
									let recipe = find_recipe_by_url(
										item.recipe_url,
										all_recipes
									);
									if (recipe) {
										recipe_to_preview = recipe;
									}
								}}
							>
								<div class="grow">
									{find_recipe_by_url(
										item.recipe_url,
										all_recipes
									)?.title || "<UNKNOWN>"}
								</div>
								<div>
									{item.quantity}
								</div>
							</button>
						{/each}
					</div>
				{/if}
				{#if !shopping_list?.items.length}
					None
				{/if}
			</div>

			<div class="card">
				<div class="flex-row vertically-centered">
					<h2 class="grow">Checklist</h2>
					<button
						class="shrink"
						onclick={() => {
							if (shopping_list) {
								shopping_list.checkedItems = {};
							}
						}}
					>
						Reset
					</button>
				</div>

				<div class="list">
					{#each data.errors as error}
						<div class="error">BAD ROW: {error}</div>
					{/each}

					{#each data.ingredients as ingredient}
						<label class="selectable">
							<input
								type="checkbox"
								checked={shopping_list.checkedItems[
									ingredient.name
								]}
								onchange={(e) => {
									if (shopping_list) {
										shopping_list.checkedItems[
											ingredient.name
										] = (e.target! as any).checked;
									}
								}}
							/>

							<div class="flex-col grow">
								<h2>
									{ingredient.name}
								</h2>

								<div class="flex-row gap0_5 flex-end">
									{#each ingredient.quantities as quantity}
										<div class="blue rounded p0_5">
											{quantity.recipe_count}
											x
											{quantity.ingredient_quantity}
										</div>
									{/each}
								</div>
							</div>
						</label>
					{/each}

					{#if !data.ingredients.length && !data.errors.length}
						None
					{/if}
				</div>
			</div>
		</div>
	{:else}
		<div class="card">
			<h1>ERROR: no recipe here :/</h1>
		</div>
	{/if}
</main>

{#if recipe_to_preview}
	<Overlay
		click={() => {
			recipe_to_preview = null;
		}}
	>
		{#snippet content()}
			<button
				class="close-button"
				onclick={(event) => {
					event.stopPropagation();
					recipe_to_preview = null;
				}}
				title="Close"
				aria-label="Close"
			>
				<CloseIcon />
			</button>
			<RecipePreview recipe={recipe_to_preview} show_colors={true} />
		{/snippet}
	</Overlay>
{/if}

<AddRecipeFloater />

<style lang="scss">
	.close-button {
		position: absolute;
		right: 0;
		top: 0;
	}
</style>
