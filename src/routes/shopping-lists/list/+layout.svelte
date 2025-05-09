<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import { page } from "$app/state";
	import { get_query_param, goto, is_number } from "$lib/utils";
	import Toolbar from "$lib/views/Toolbar.svelte";
	import { onMount } from "svelte";

	const { children } = $props();

	const links = [
		{
			text: "Edit",
			url: "/shopping-lists/list/edit",
		},
		{
			text: "View",
			url: "/shopping-lists/list/view",
		},
		// {
		// 	text: "Export",
		// 	url: "/shopping-lists/list/export",
		// },
	];

	let list_id = $state<number | null>(null);
	const page_id = $derived(page.route.id);
	const current_index = $derived(
		links.findIndex((link) => link.url === page_id)
	);

	let mounted = $state(false);
	onMount(() => {
		try_load();
		mounted = true;
	});

	afterNavigate(() => {
		try_load();
	});

	function try_load() {
		if (list_id === null) {
			let maybe_id = get_query_param("id");
			if (maybe_id !== null && is_number(maybe_id)) {
				list_id = Number(maybe_id);
			}
		}
	}
</script>

<Toolbar title="Shopping list" back_path="/shopping-lists" />

<div class="flex-row vertically-centered p1">
	{#each links as link, i}
		{@render fancy_button(link.text, link.url, i)}
		{#if i < links.length - 1}
			<hr class="grow grey-text" />
		{/if}
	{/each}
</div>

{@render children()}

{#snippet fancy_button(text: string, url: string, index: number)}
	<button
		class="blue rounded p0_5 bold with-fade"
		class:selected={page_id === url}
		disabled={page_id === url}
		onclick={() => {
			goto(url, {
				page_data: {
					is_going_back: index < current_index,
					skip_page_animation: true,
				},
				query_params: { id: list_id },
			});
		}}
	>
		{text}
	</button>
{/snippet}

<style lang="scss">
	.with-fade {
		transition: background-color 300ms;
	}
</style>
