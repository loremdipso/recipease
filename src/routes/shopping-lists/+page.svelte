<script>
	import { get_shopping_lists } from "$lib/data";
	import PencilIcon from "$lib/icons/pencil_icon.svelte";
	import { get_url, goto } from "$lib/utils";
	import Toolbar from "$lib/views/Toolbar.svelte";

	let lists = $state(get_shopping_lists());
</script>

<Toolbar title="Shopping lists" back_path="/" />

<main class="flex-col gap1">
	<div class="card">
		<a
			class="green full-width p0_5 center rounded"
			href={get_url("/shopping-lists/new")}>Create new list</a
		>
	</div>

	<div class="card">
		<div class="list">
			{#each lists as list}
				<div class="flex-row">
					<a
						class="grow"
						href={get_url(`/shopping-lists/list?id=${list.id}`)}
					>
						{list.name}
					</a>
					<div>
						<button
							class="blue"
							onclick={() => {
								goto(`/shopping-lists/edit?id=${list.id}`);
							}}
							title="Edit"
							aria-label="Edit"
						>
							<PencilIcon />
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
