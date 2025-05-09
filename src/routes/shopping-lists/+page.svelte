<script>
	import { delete_shopping_list, get_shopping_lists } from "$lib/data";
	import MagnifyingGlass from "$lib/icons/magnifying_glass.svelte";
	import TrashCanIcon from "$lib/icons/trash_can_icon.svelte";
	import { get_url, go_forward_to } from "$lib/utils";
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
				<div class="flex-row">
					<a
						class="grow"
						href={get_url(
							`/shopping-lists/list/edit?id=${list.id}`
						)}
					>
						{list.name}
					</a>
					<a
						class="vertically-centered"
						href={get_url(
							`/shopping-lists/list/view?id=${list.id}`
						)}
					>
						<MagnifyingGlass />
					</a>
					<button
						class="shrink"
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
