<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import {
		get_all_recipes,
		get_shopping_list,
		update_shopping_list,
	} from "$lib/data";
	import CloseIcon from "$lib/icons/close_icon.svelte";
	import type { IIngredient, IRecipe, IShoppingList } from "$lib/types";
	import { get_query_param, is_number } from "$lib/utils";
	import Collapsible from "$lib/views/Collapsible.svelte";
	import Overlay from "$lib/views/Overlay.svelte";
	import RecipePreview from "$lib/views/RecipePreview.svelte";
	import { onMount } from "svelte";

	let shopping_list = $state<IShoppingList | null>(null);

	let all_recipes = $state(get_all_recipes().reverse());
	let ingredients = $derived<IIngredient[]>(get_ingredients());

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

	function find_recipe(url: string): IRecipe | null {
		for (let recipe of all_recipes) {
			if (recipe.url === url) {
				return recipe;
			}
		}
		return null;
	}

	function get_ingredients(): IIngredient[] {
		if (!shopping_list) {
			return [];
		}

		let mapping: { [key: string]: number } = {};
		for (let item of shopping_list.items) {
			let recipe = find_recipe(item.recipe_url);
			if (recipe) {
				for (let row of recipe.ingredients) {
					let key = row; // TODO
					if (mapping[key]) {
						mapping[key] += item.quantity;
					} else {
						mapping[key] = item.quantity;
					}
				}
			} else {
				// TODO: how to handle missing recipes?
			}
		}

		let rv: IIngredient[] = [];
		for (let key of Object.keys(mapping)) {
			rv.push({
				name: key,
				quantity: mapping[key],
			});
		}

		return rv;
	}
</script>

<main>
	{#if shopping_list}
		<div class="flex-col gap1">
			<h1 class="grow">{shopping_list.name}</h1>

			<Collapsible>
				{#snippet title()}
					<h2>Recipes</h2>
				{/snippet}

				{#snippet content()}
					{#if shopping_list}
						<div class="list">
							{#each shopping_list.items as item}
								<div class="flex-row">
									<div class="grow">
										{find_recipe(item.recipe_url)?.title ||
											"<UNKNOWN>"}
									</div>
									<div>
										{item.quantity}
									</div>
								</div>
							{/each}
						</div>
					{/if}
					{#if !shopping_list?.items.length}
						None
					{/if}
				{/snippet}
			</Collapsible>

			<div class="card">
				<div class="flex-row">
					<h2>Checklist</h2>
					<button
						class="shrink"
						onclick={() => {
							if (shopping_list) {
								shopping_list.checkedItems = {};
							}
						}}>Reset</button
					>
				</div>

				<div class="list">
					{#each ingredients as ingredient}
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

							<span>
								{ingredient.name}: {ingredient.quantity}
							</span>
						</label>
					{/each}

					{#if !ingredients.length}
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

<style lang="scss">
	.close-button {
		position: absolute;
		right: 0;
		top: 0;
	}
</style>
