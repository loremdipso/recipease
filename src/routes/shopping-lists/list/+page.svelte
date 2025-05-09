<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import { delete_shopping_list, get_shopping_list } from "$lib/data";
	import PencilIcon from "$lib/icons/pencil_icon.svelte";
	import type { IShoppingList } from "$lib/types";
	import { get_query_param, goto, is_number } from "$lib/utils";
	import Toolbar from "$lib/views/Toolbar.svelte";
	import { onMount } from "svelte";

	let list = $state<IShoppingList | null>(null);
	let is_error = $state(false);

	onMount(() => {
		try_load();
	});

	afterNavigate(() => {
		try_load();
	});

	function try_load() {
		// TODO: is this how this works?
		if (is_error || list) {
			return;
		}

		let maybe_id = get_query_param("id");
		if (maybe_id !== null && is_number(maybe_id)) {
			list = get_shopping_list(Number(maybe_id));
			if (!list) {
				is_error = true;
			}
		} else {
			is_error = true;
		}
	}
</script>

<Toolbar title={list?.name || "ERROR"} back_path="/shopping-lists" />

<main>
	<div class="card flex-col gap1">
		{#if is_error}
			<h1>ERROR. Sorry bud :/</h1>
		{:else if list}
			<h1>
				{list.name}
			</h1>
			<div class="flex-row">
				<button
					class="red"
					onclick={() => {
						if (list) {
							delete_shopping_list(list.id);
							goto("/shopping-lists");
						}
					}}
				>
					Delete list
				</button>

				<button
					class="blue vertically-centered flex-row"
					onclick={() => {
						if (list) {
							goto(`/shopping-lists/edit?id=${list.id}`);
						}
					}}
				>
					<PencilIcon />
					<span class="grow"> Edit </span>
				</button>

				<button
					class="green vertically-centered flex-row"
					onclick={() => {
						if (list) {
							delete_shopping_list(list.id);
							goto("/shopping-lists");
						}
					}}
				>
					<span class="grow"> View </span>
				</button>
			</div>
		{/if}
	</div>
</main>
