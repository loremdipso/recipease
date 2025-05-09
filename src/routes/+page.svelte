<script lang="ts">
	import Toolbar from "$lib/views/Toolbar.svelte";
	import { get_url } from "$lib/utils";
	import AddRecipeFloater from "$lib/views/AddRecipeFloater.svelte";
	import Help from "$lib/views/Help.svelte";
	import { last_list_id } from "$lib/globals.svelte";
</script>

<Toolbar title="RecipEase">
	{#snippet extra_buttons()}
		{#if $last_list_id !== null}
			<a
				class="button-like"
				href={get_url(`/shopping-lists/list/view`, {
					id: $last_list_id.toString(),
				})}
			>
				View most recent list
			</a>
		{/if}
		<a class="button-like" href={get_url(`/shopping-lists`)}>
			Shopping Lists
		</a>
		<a class="button-like" href={get_url(`/my-recipes`)}> My Recipes </a>
	{/snippet}
</Toolbar>

<main>
	<Help />
	<AddRecipeFloater />
</main>
