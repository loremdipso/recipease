<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import { UNITS } from "$lib/constants";
	import {
		convert_to_value,
		pluralize_value,
		try_convert,
	} from "$lib/converters";
	import {
		find_recipe_by_url,
		get_all_recipes,
		get_shopping_list,
		update_shopping_list,
	} from "$lib/data";
	import CloseIcon from "$lib/icons/close_icon.svelte";
	import MagnifyingGlass from "$lib/icons/magnifying_glass.svelte";
	import { get_ingredients } from "$lib/parser";
	import type {
		IIngredient,
		IParseError,
		IQuantity,
		IRecipe,
		IShoppingList,
	} from "$lib/types";
	import { get_query_param, is_number } from "$lib/utils";
	import AddRecipeFloater from "$lib/views/AddRecipeFloater.svelte";
	import Collapsible from "$lib/views/Collapsible.svelte";
	import Overlay from "$lib/views/Overlay.svelte";
	import RecipePreview from "$lib/views/RecipePreview.svelte";
	import SlideCheck from "$lib/views/SlideCheck.svelte";
	import { onMount } from "svelte";

	let shopping_list = $state<IShoppingList | null>(null);

	let all_recipes = $state(get_all_recipes().reverse());
	let data = $derived<{
		errors: IParseError[];
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

	function guesstimate(quantities: IQuantity[]): number | string {
		let values = [];
		for (let quantity of quantities) {
			let result = try_convert(quantity.ingredient_quantity);
			if (result) {
				let value = convert_to_value(
					result.def,
					result.value,
					UNITS.IMPERIAL,
					quantity.recipe_count
				);
				if (value) {
					values.push(value);
				} else {
					return "ERROR";
				}
			} else {
				return "ERROR";
			}
		}

		let total = 0;
		let def = null;
		for (let value of values) {
			if (def && value.def !== def) {
				return "ERROR";
			}
			def = value.def;
			total += value.value;
		}
		// TODO: make sure the units all match up
		if (def) {
			if (!isNaN(total)) {
				return pluralize_value(total, def);
			}
		}

		return "ERROR";
	}

	function show_recipe_from_url(
		recipe_url: string,
		some_line_to_focus?: string
	) {
		let recipe = find_recipe_by_url(recipe_url, all_recipes);
		if (recipe) {
			recipe_to_preview = recipe;
			line_to_focus = some_line_to_focus;
		}
	}

	let show_details = $state(false);
	let recipe_to_preview = $state<IRecipe | null>(null);
	let line_to_focus = $state<string | undefined>(undefined);
	let original_line_to_show = $state<string | null>(null);
</script>

<main>
	{#if shopping_list}
		<div class="flex-col gap1">
			<h1 class="grow">{shopping_list.name}</h1>

			<Collapsible title="Source recipes" start_collapsed={true}>
				{#snippet content()}
					{#if shopping_list}
						<div class="list flex-col">
							{#each shopping_list.items as item}
								<button
									class="flex-row vertically-centered"
									onclick={(event) => {
										event.stopPropagation();
										show_recipe_from_url(item.recipe_url);
									}}
								>
									<div
										class="grow flex-row vertically-centered flex-start gap1"
									>
										<MagnifyingGlass />
										<span>
											{find_recipe_by_url(
												item.recipe_url,
												all_recipes
											)?.title || "<UNKNOWN>"}
										</span>
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
				{/snippet}
			</Collapsible>

			<div class="card">
				<SlideCheck
					text="Show details"
					checked={show_details}
					onchange={(checked) => {
						show_details = checked;
					}}
				/>
			</div>

			<div class="card">
				<div class="flex-row vertically-centered">
					<h2 class="grow">Checklist</h2>
					{#if data.ingredients.length || data.errors.length}
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
					{/if}
				</div>

				<div class="list">
					{#each data.errors as error}
						<label class="selectable">
							<input
								type="checkbox"
								checked={shopping_list.checkedItems[error.text]}
								onchange={(e) => {
									if (shopping_list) {
										shopping_list.checkedItems[error.text] =
											(e.target! as any).checked;
									}
								}}
							/>
							<div class="flex-row vertically-centered grow">
								<span class="grow">
									{error.text.replaceAll("**", "")}
								</span>

								<button
									class="shrink"
									onclick={() => {
										show_recipe_from_url(
											error.recipe_url,
											error.text
										);
									}}
								>
									???
								</button>
							</div>
						</label>
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
								<div class="flex-row grow">
									<h2 class="grow">
										{ingredient.name}
									</h2>
									<div>
										{guesstimate(ingredient.quantities)}
									</div>
								</div>

								<div class="flex-row gap0_5 flex-end">
									{#if show_details}
										{#each ingredient.quantities as quantity}
											<button
												class="blue rounded p0_5 shrink flex-row vertically-centered gap0_5"
												onclick={() => {
													original_line_to_show =
														quantity.original_line;
												}}
												title="See original line"
												aria-label="See original line"
											>
												<MagnifyingGlass />
												{#if quantity.recipe_count > 1}
													{quantity.recipe_count}
													x
													{quantity.ingredient_quantity}
												{:else}
													{quantity.ingredient_quantity}
												{/if}
											</button>
										{/each}
									{/if}
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
			<RecipePreview
				recipe={recipe_to_preview}
				{line_to_focus}
				show_colors={true}
			/>
		{/snippet}
	</Overlay>
{/if}

{#if original_line_to_show}
	<Overlay
		click={() => {
			original_line_to_show = null;
		}}
	>
		{#snippet content()}
			{original_line_to_show}
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
