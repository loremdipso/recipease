<script lang="ts">
	import { get_all_recipes } from "$lib/data";
	import CloseIcon from "$lib/icons/close_icon.svelte";
	import MagnifyingGlass from "$lib/icons/magnifying_glass.svelte";
	import MinusIcon from "$lib/icons/minus_icon.svelte";
	import PlusIcon from "$lib/icons/plus_icon.svelte";
	import type { IIngredient, IRecipe, IShoppingListItem } from "$lib/types";
	import { goto } from "$lib/utils";
	import Overlay from "$lib/views/Overlay.svelte";
	import RecipePreview from "$lib/views/RecipePreview.svelte";
	import Stepper from "$lib/views/Stepper.svelte";
	import Toolbar from "$lib/views/Toolbar.svelte";

	let all_recipes = $state(get_all_recipes().reverse());
	let recipes = $derived(
		all_recipes.filter((recipe) => recipe_matches(recipe, search_value))
	);

	let recipe_map = $state<{ [key: string]: number }>({});
	let shopping_list = $derived<IShoppingListItem[]>(get_shopping_list());
	let ingredients = $derived<IIngredient[]>(get_ingredients());

	let recipe_to_preview = $state<IRecipe | null>(null);

	let name = $state("New shopping list");
	let search_value = $state("");

	function get_shopping_list(): IShoppingListItem[] {
		let rv: IShoppingListItem[] = [];
		for (let key of Object.keys(recipe_map)) {
			for (let recipe of all_recipes) {
				if (recipe.url === key) {
					rv.push({
						recipe: $state.snapshot(recipe),
						quantity: recipe_map[key],
					});
					break;
				}
			}
		}
		return rv;
	}

	function get_ingredients(): IIngredient[] {
		let mapping: { [key: string]: number } = {};
		for (let item of shopping_list) {
			for (let row of item.recipe.ingredients) {
				let key = row; // TODO
				if (mapping[row]) {
					mapping[row] += item.quantity;
				} else {
					mapping[row] = item.quantity;
				}
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
		// TODO
		goto("/shopping-lists");
	}
</script>

<Toolbar title="New shopping list" back_path="/shopping-lists" />

<main>
	<div class="card">
		<Stepper on_finish={save}>
			{#snippet title(step)}
				{#if step === 0}
					Pick
				{:else if step === 1}
					Edit
				{:else if step === 2}
					Finalize
				{/if}
			{/snippet}

			{#snippet step1()}
				<label class="flex-row gap1">
					<b> Filter: </b>
					<input class="grow" bind:value={search_value} />
				</label>
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
			{/snippet}

			{#snippet step2()}
				<div>
					<h2>Recipes</h2>
					{#each shopping_list as item}
						<div class="flex-row">
							<div class="grow">
								{item.recipe.title}
							</div>
							<div>
								{item.quantity}
							</div>
						</div>
					{/each}
				</div>

				<div>
					<h2>Ingredients</h2>
					{#each ingredients as ingredient}
						<div class="flex-row">
							<div class="grow">
								{ingredient.name}
							</div>
							<div>
								{ingredient.quantity}
							</div>
						</div>
					{/each}
				</div>
			{/snippet}

			{#snippet step3()}
				<label>
					Pick a name:
					<input bind:value={name} />
				</label>
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
