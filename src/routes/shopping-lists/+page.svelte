<script>
	import { delete_shopping_list, get_shopping_lists } from "$lib/data";
	import { last_list_id } from "$lib/globals.svelte";
	import MagnifyingGlass from "$lib/icons/magnifying_glass.svelte";
	import PencilIcon from "$lib/icons/pencil_icon.svelte";
	import TrashCanIcon from "$lib/icons/trash_can_icon.svelte";
	import { get_url, go_forward_to } from "$lib/utils";
	import AddRecipeFloater from "$lib/views/AddRecipeFloater.svelte";
	import Toolbar from "$lib/views/Toolbar.svelte";

	let lists = $state(get_shopping_lists());
</script>

<Toolbar title="Shopping lists" back_path="/" />

<main class="flex-col gap1">
	<div class="card">
		<button
			class="green full-width p0_5 center rounded"
			onclick={() => {
				go_forward_to("/shopping-lists/list/edit", { id: "-1" });
			}}
		>
			Create new list
		</button>
	</div>

	{#if lists.length}
		<div class="list">
			{#each lists as list}
				<div
					class="flex-row vertically-centered gap1"
					class:selected={$last_list_id === list.id}
				>
					<a
						class="grow flex-row vertically-centered"
						href={get_url(
							`/shopping-lists/list/view?id=${list.id}`
						)}
					>
						<span class="grow">
							{list.name}
						</span>
						<span class="p1">
							<MagnifyingGlass />
						</span>
					</a>
					<a
						class="p1"
						href={get_url(
							`/shopping-lists/list/edit?id=${list.id}`
						)}
					>
						<PencilIcon />
					</a>
					<button
						class="shrink p1"
						onclick={() => {
							lists = delete_shopping_list(list.id);
						}}
					>
						<TrashCanIcon />
					</button>
				</div>
			{/each}
		</div>
	{/if}
</main>

<AddRecipeFloater />
