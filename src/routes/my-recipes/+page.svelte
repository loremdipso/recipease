<script lang="ts">
	import { goto } from "$app/navigation";
	import { get_all_recipes, delete_recipe } from "$lib/data";
	import { notify } from "$lib/globals.svelte";
	import { get_url_from_clipboard } from "$lib/utils";
	import Toolbar from "$lib/views/Toolbar.svelte";

	let { current_url } = $props<{
		current_url: string | null;
		onBack(): void;
		onOpenUrl(new_url: string): void;
	}>();

	let recipes = $state(get_all_recipes().reverse());
</script>

<Toolbar title="My Saved Recipes" show_back_button={true} />

<main class="flex-col">
	{#each recipes as recipe}
		<div
			class="recipe-row"
			class:selected={recipe.url && recipe.url === current_url}
			role="button"
			onclick={(event) => {
				event.stopPropagation();
				goto(`/recipe?${encodeURIComponent(recipe.url)}`);
			}}
			tabindex="0"
			onkeypress={(event) => {
				// TODO
			}}
		>
			<span class="grow">
				{recipe.title || "<missing title>"}
			</span>

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
	{/each}

	<div class="flex-col">
		<button
			class="green grow m1"
			onclick={async () => {
				let url = await get_url_from_clipboard();
				if (url) {
					goto(`/recipe?${encodeURIComponent(url)}`);
				}
			}}
		>
			Add new
		</button>
	</div>
</main>

<style lang="scss">
	.recipe-row {
		display: flex;
		gap: 5px;
		align-items: center;
		cursor: pointer;
		background: black;
		padding: 0.5rem;
		margin: 0.1rem;
	}

	.recipe-row.selected {
		background-color: red;
	}
</style>
