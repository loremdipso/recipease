<script lang="ts">
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
	import type { IRecipe, IShoppingList, IShoppingListItem } from "$lib/types";
	import {
		get_query_param,
		goto,
		is_number,
		set_query_param,
	} from "$lib/utils";
	import AddRecipeFloater from "$lib/views/AddRecipeFloater.svelte";
	import Overlay from "$lib/views/Overlay.svelte";
	import RecipePreview from "$lib/views/RecipePreview.svelte";
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

	let id = $state(-1);
	let recipe_map = $state<{ [key: string]: number }>({});
	let name = $state(get_default_list_name());
	let shopping_list = $derived<IShoppingList>({
		id,
		name,
		items: get_items(),
		checkedItems: {},
	});

	onMount(() => {
		try_load();
	});

	// afterNavigate(() => {
	// 	try_load();
	// });

	function try_load() {
		if (id !== -1) {
			return;
		}

		let temp_list = null;
		let maybe_id = get_query_param("id");
		if (maybe_id !== null && is_number(maybe_id)) {
			temp_list = get_shopping_list(Number(maybe_id));
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
				set_query_param("id", id.toString());
			}
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

	function try_clear() {
		recipe_map = {};
		name = get_default_list_name();
	}
</script>

<div class="card">
	<div class="flex-col gap1">
		<label class="flex-row gap1">
			<b>Name:</b>
			<input class="grow pl1" bind:value={name} />
		</label>

		<label class="flex-row gap1">
			<b> Filter: </b>
			<input class="grow" bind:value={search_value} />
		</label>

		<div class="flex-row gap1">
			<button onclick={try_clear} class="blue rounded"> Reset </button>

			<button
				class="red rounded"
				onclick={() => {
					delete_shopping_list(shopping_list.id);
					goto("/shopping-lists");
				}}
			>
				Delete list
			</button>

			<h3 class="vertically-centered black rounded p0_5">Autosaved :)</h3>
		</div>

		<div class="list">
			{#each recipes as recipe}
				<div
					class="flex-row"
					class:selected={(recipe_map[recipe.url] || 0) > 0}
				>
					<button
						class="grow vertically-centered gap1 white-text"
						title="See preview"
						aria-label="See preview"
						onclick={(event) => {
							event.stopPropagation();
							recipe_to_preview = recipe;
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
						<b title="Count" aria-label="Count">
							{recipe_map[recipe.url] || 0}
						</b>
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
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

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
