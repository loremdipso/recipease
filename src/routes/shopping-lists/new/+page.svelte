<script lang="ts">
	import { get_all_recipes } from "$lib/data";
	import MagnifyingGlass from "$lib/icons/magnifying_glass.svelte";
	import MinusIcon from "$lib/icons/minus_icon.svelte";
	import PlusIcon from "$lib/icons/plus_icon.svelte";
	import type { IRecipe, IShoppingListItem } from "$lib/types";
	import Stepper from "$lib/views/Stepper.svelte";
	import Toolbar from "$lib/views/Toolbar.svelte";

	let all_recipes = $state(get_all_recipes().reverse());
	let recipes = $derived(
		all_recipes.filter((recipe) => recipe_matches(recipe, search_value))
	);

	let recipe_map = $state<{ [key: string]: number }>({});
	let shopping_list = $state<IShoppingListItem[]>([]);

	let name = $state("New shopping list");
	let search_value = $state("");

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
		// TODO
	}

	function save() {
		// TODO
	}
</script>

<Toolbar title="New shopping list" back_path="/shopping-lists" />

<main>
	<div class="card">
		<Stepper>
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
				step2
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
