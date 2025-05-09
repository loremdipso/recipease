<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import {
		add_shopping_list,
		delete_shopping_list,
		get_all_recipes,
		get_shopping_list,
		update_shopping_list,
	} from "$lib/data";
	import CloseIcon from "$lib/icons/close_icon.svelte";
	import MagnifyingGlass from "$lib/icons/magnifying_glass.svelte";
	import MinusIcon from "$lib/icons/minus_icon.svelte";
	import PlusIcon from "$lib/icons/plus_icon.svelte";
	import type {
		IIngredient,
		IRecipe,
		IShoppingList,
		IShoppingListItem,
	} from "$lib/types";
	import { get_query_param, goto, is_number } from "$lib/utils";
	import Overlay from "$lib/views/Overlay.svelte";
	import RecipePreview from "$lib/views/RecipePreview.svelte";
	import Stepper from "$lib/views/Stepper.svelte";
	import Toolbar from "$lib/views/Toolbar.svelte";
	import { onMount } from "svelte";

	function get_default_list_name(): string {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate()).padStart(2, "0");

		return `${month}-${day}-${year} list`;
	}

	let all_recipes = $state(get_all_recipes().reverse());
	let recipes = $derived(
		all_recipes.filter((recipe) => recipe_matches(recipe, search_value))
	);

	let id = $derived(-1);
	let recipe_map = $state<{ [key: string]: number }>({});
	let name = $state(get_default_list_name());
	let shopping_list = $derived<IShoppingList>({
		id,
		name,
		items: get_items(),
	});
	let ingredients = $derived<IIngredient[]>(get_ingredients());
	let checkedItems = $state<{ [key: string]: boolean }>({});

	onMount(() => {
		try_load();
	});

	afterNavigate(() => {
		try_load();
	});

	function try_load() {
		if (id !== -1) {
			return;
		}

		let temp_list = null;
		let maybe_id = get_query_param("id");
		if (maybe_id !== null && is_number(maybe_id)) {
			temp_list = get_shopping_list(Number(maybe_id));
		}

		if (temp_list) {
			recipe_map = {};
			id = temp_list.id;
			name = temp_list.name;
			for (let item of temp_list.items) {
				if (recipe_map[item.recipe_url]) {
					recipe_map[item.recipe_url] += item.quantity;
				} else {
					recipe_map[item.recipe_url] = item.quantity;
				}
			}
		} else {
			id = add_shopping_list($state.snapshot(shopping_list));
		}
	}

	$effect(() => {
		if (shopping_list.id >= 0) {
			update_shopping_list(shopping_list);
		}
	});

	let recipe_to_preview = $state<IRecipe | null>(null);
	let search_value = $state("");

	function get_items(): IShoppingListItem[] {
		let rv: IShoppingListItem[] = [];
		for (let key of Object.keys(recipe_map)) {
			for (let recipe of all_recipes) {
				if (recipe.url === key) {
					rv.push({
						recipe_url: recipe.url,
						quantity: recipe_map[key],
					});
					break;
				}
			}
		}
		return rv;
	}

	function find_recipe(url: string): IRecipe | null {
		for (let recipe of all_recipes) {
			if (recipe.url === url) {
				return recipe;
			}
		}
		return null;
	}

	function get_ingredients(): IIngredient[] {
		let mapping: { [key: string]: number } = {};
		for (let item of shopping_list.items) {
			let recipe = find_recipe(item.recipe_url);
			if (recipe) {
				for (let row of recipe.ingredients) {
					let key = row; // TODO
					if (mapping[row]) {
						mapping[row] += item.quantity;
					} else {
						mapping[row] = item.quantity;
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

	function recipe_matches(recipe: IRecipe, search_value: string): boolean {
		let words = search_value
			.toLowerCase()
			.split(" ")
			.map((piece) => piece.trim())
			.filter((piece) => piece.length);

		let title = recipe.title.toLowerCase();
		let url = recipe.url.toLowerCase();

		for (let word of words) {
			if (title.indexOf(word) === -1 && url.indexOf(word) === -1) {
				return false;
			}
		}
		return true;
	}

	function add_to_map(recipe: IRecipe) {
		if (recipe_map[recipe.url]) {
			recipe_map[recipe.url] += 1;
		} else {
			recipe_map[recipe.url] = 1;
		}
	}

	function subtract_from_map(recipe: IRecipe) {
		if (recipe_map[recipe.url]) {
			recipe_map[recipe.url] -= 1;
			if (recipe_map[recipe.url] <= 0) {
				delete recipe_map[recipe.url];
			}
		}
	}

	function show_preview(recipe: IRecipe) {
		recipe_to_preview = recipe;
	}

	function save() {
		let new_id = add_shopping_list($state.snapshot(shopping_list));
		goto(`/shopping-lists/list?id=${new_id}`);
	}

	function try_clear() {
		recipe_map = {};
		name = get_default_list_name();
	}
</script>

<Toolbar title="Edit shopping list" back_path="/shopping-lists" />

<main>
	<div class="card">
		<div class="flex-row gap1">
			<input class="grow pl1" bind:value={name} />
		</div>

		<Stepper on_finish={save}>
			{#snippet title(step)}
				{#if step === 0}
					Edit
				{:else if step === 1}
					Shop
				{:else if step === 2}
					Export
				{/if}
			{/snippet}

			{#snippet step1()}
				<div class="flex-col gap1">
					<label class="flex-row gap1">
						<b> Filter: </b>
						<input class="grow" bind:value={search_value} />
					</label>

					<div class="flex-row gap1">
						<button onclick={try_clear} class="blue rounded">
							Reset
						</button>

						<button
							class="red rounded"
							onclick={() => {
								delete_shopping_list(shopping_list.id);
								goto("/shopping-lists");
							}}
						>
							Delete list
						</button>

						<h3 class="vertically-centered black rounded p0_5">
							Autosaved :)
						</h3>
					</div>

					<div class="list">
						{#each recipes as recipe}
							<div class="flex-row">
								<button
									class="grow vertically-centered gap1 white-text"
									title="See preview"
									aria-label="See preview"
									onclick={(event) => {
										event.stopPropagation();
										show_preview(recipe);
									}}
								>
									<MagnifyingGlass />
									<h2>
										{recipe.title || "<missing title>"}
									</h2>
								</button>

								<div class="shrink vertically-centered">
									<button
										title="Add to list"
										aria-label="Add to list"
										onclick={(event) => {
											event.stopPropagation();
											subtract_from_map(recipe);
										}}
									>
										<MinusIcon />
									</button>
									<button
										title="Add to list"
										aria-label="Add to list"
										onclick={(event) => {
											event.stopPropagation();
											add_to_map(recipe);
										}}
									>
										<PlusIcon />
									</button>
									<b title="Count" aria-label="Count">
										{recipe_map[recipe.url] || 0}
									</b>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/snippet}

			{#snippet step2()}
				<div class="flex-col gap1">
					<h2>Recipes</h2>
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

					<div>
						<h2>Combined ingredients</h2>

						<div class="list">
							{#each ingredients as ingredient}
								<label class="selectable">
									<input
										type="checkbox"
										checked={checkedItems[ingredient.name]}
										onchange={(e) => {
											checkedItems[ingredient.name] = (
												e.target! as any
											).checked;
										}}
									/>

									{ingredient.name}: {ingredient.quantity}
								</label>
							{/each}
						</div>
					</div>
				</div>
			{/snippet}

			{#snippet step3()}
				<button
					onclick={() => {
						save();
					}}
				>
					Save
				</button>
			{/snippet}
		</Stepper>
	</div>
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
