<script lang="ts">
	import List from "$lib/views/List.svelte";
	import Pane from "$lib/views/Pane.svelte";
	import SlideCheck from "$lib/views/SlideCheck.svelte";
	import { UNITS } from "$lib/constants";
	import { data_to_markdown_string } from "$lib/renderers";
	import { equals, get_query_url, get_url, goto } from "$lib/utils";
	import {
		delete_recipe,
		fix_data,
		get_all_recipes,
		get_meta_sections,
		get_shopping_lists,
		save_shopping_lists,
		try_load_url,
		update_recipe,
	} from "$lib/data";
	import { get_preference, save_preference } from "$lib/preferences";
	import { last_list_id, notify } from "$lib/globals.svelte";
	import { onMount } from "svelte";
	import { set_wake_lock } from "$lib/wake_lock";
	import { type IRecipe, type ISection } from "$lib/types";
	import { writable } from "svelte/store";
	import Toolbar from "$lib/views/Toolbar.svelte";
	import Help from "$lib/views/Help.svelte";
	import AddRecipeFloater from "$lib/views/AddRecipeFloater.svelte";
	import Popup from "$lib/views/Popup.svelte";
	import { afterNavigate } from "$app/navigation";
	import HamburgerMenu from "$lib/views/HamburgerMenu.svelte";
	import PencilIcon from "$lib/icons/pencil_icon.svelte";
	import SaveIcon from "$lib/icons/save_icon.svelte";
	import ReloadIcon from "$lib/icons/reload_icon.svelte";
	import TrashCanIcon from "$lib/icons/trash_can_icon.svelte";
	import HomeButton from "$lib/views/buttons/HomeButton.svelte";
	import CurrentListButton from "$lib/views/buttons/CurrentListButton.svelte";
	import ShareButton from "$lib/views/buttons/ShareButton.svelte";

	let url = $state<string | null>(null);

	onMount(() => {
		try_load();
	});

	afterNavigate(() => {
		try_load();
	});

	function try_load() {
		let new_url = get_query_url();
		if (new_url !== url) {
			url = new_url;
		}
	}

	const data = writable<IRecipe | null>(null);
	let current_units = $state(UNITS.ORIGINAL);
	let current_quantity = $state(1.0);
	let show_colors = $state(get_preference("show_colors"));
	const final_data = $derived(fix_data($data, show_colors));

	let selectedKeyword = $state<string | null>(null);
	let checkedItems = $state<{ [key: string]: boolean }>({});
	let section_to_focus = $state<ISection | null>(null);
	let recipe_to_delete = $state<string | null>(null);
	let title_to_edit = $state<string | null>(null);

	let meta_sections = $derived(
		get_meta_sections(
			final_data,
			show_colors,
			current_units,
			current_quantity
		)
	);

	let last_seen_url: string | null = null;
	$effect(() => {
		if (url !== last_seen_url) {
			last_seen_url = url;
			(async () => {
				reload_data(false);
			})();
		}
	});

	function set_units(new_units: UNITS) {
		if (new_units === current_units) {
			return;
		}

		current_units = new_units;
	}

	function set_quantity(new_quantity: number) {
		if (equals(new_quantity, current_quantity)) {
			return;
		}

		current_quantity = new_quantity;
	}

	async function reload_data(force_reload = false) {
		checkedItems = {};
		data.set(await try_load_url(url, "", force_reload));

		// unlikely we're going to run out of numbers, but still...
		selectedKeyword = null;
		section_to_focus = null;
	}

	function save_title() {
		if (data) {
			data.update((recipe) => {
				if (recipe && title_to_edit) {
					recipe.title = title_to_edit;
					update_recipe(recipe);
				}
				return recipe;
			});
		}
		title_to_edit = null;
	}

	let lists = $state(get_shopping_lists());
	let exists_in_list = $derived(
		Boolean(
			lists
				.find((list) => list.id === $last_list_id)
				?.items.find((item) => item.recipe_url === url)
		)
	);
	function add_recipe_to_list(list_id: number) {
		let did_update = false;
		for (let list of lists) {
			if (list.id === list_id) {
				for (let item of list.items) {
					if (item.recipe_url === url) {
						item.quantity += 1;
						did_update = true;
					}
				}
				if (!did_update) {
					did_update = true;
					list.items.push({
						recipe_url: url!,
						quantity: 1,
					});
				}
			}
		}

		if (did_update) {
			save_shopping_lists(lists);
		}
	}

	function remove_recipe_from_list(list_id: number) {
		for (let list of lists) {
			if (list.id === list_id) {
				list.items = list.items.filter((e) => e.recipe_url !== url);
			}
		}

		save_shopping_lists(lists);
	}

	let should_keep_screen_awake = $state(get_preference("keep_screen_awake"));

	// Set wake lock to true by default
	onMount(() => {
		(async () => {
			await set_wake_lock(should_keep_screen_awake, false);
		})();

		return async () => {
			await set_wake_lock(false, false);
		};
	});
</script>

<Toolbar
	back_path="/my-recipes"
	page_data={{ previously_selected_recipe: url }}
>
	{#snippet title_snippet()}
		<div class="flex-row vertically-centered grow">
			<div class="grow flex-col">
				{#if title_to_edit}
					<input
						bind:value={title_to_edit}
						onchange={() => {
							save_title();
						}}
					/>
				{:else}
					<button
						class="shrink white-text flex-row vertically-centered p0 gap0_5"
						onclick={() =>
							goto("/my-recipes", {
								page_data: {
									is_going_back: true,
									previously_selected_recipe: url,
								},
							})}
						title="Go back"
						aria-label="Go back"
					>
						<h1>{final_data?.title}</h1>
					</button>
				{/if}
			</div>

			<button
				class="shrink pl1"
				title={title_to_edit ? "Save" : "Edit"}
				aria-label={title_to_edit ? "Save" : "Edit"}
				onclick={() => {
					if (title_to_edit) {
						save_title();
					} else {
						title_to_edit = final_data?.title || "";
					}
				}}
			>
				{#if title_to_edit}
					<SaveIcon />
				{:else}
					<PencilIcon />
				{/if}
			</button>
		</div>
	{/snippet}
	{#snippet extra_buttons()}
		<HomeButton />
		<CurrentListButton go_back={false} />
		{#if final_data}
			<ShareButton
				onshare={async () => {
					const url_obj = new URL(window.location.href);
					url_obj.search = "";
					if (url) {
						url_obj.searchParams.delete("my-recipes");
						url_obj.searchParams.set("url", url);
					}
					await navigator.share({
						title: "Here's a recipe for ya!",
						url: url_obj.toString(),
					});
				}}
			/>
		{/if}
		<button
			onclick={async () => {
				if (url) {
					notify("Reloading...");
					await reload_data(true);
				} else {
					notify("No url!", "error");
				}
			}}
			title="Reload this recipe"
			aria-label="Reload this recipe"
		>
			<ReloadIcon />
		</button>

		{#if final_data}
			<HamburgerMenu>
				{#snippet items()}
					<div class="flex-col gap1">
						<a
							href={url}
							target="_blank"
							class="button-like"
							class:disabled={!Boolean(url)}
						>
							Open the original
						</a>

						<hr />

						<button
							onclick={async () => {
								if (final_data) {
									let markdown =
										data_to_markdown_string(final_data);
									await navigator.clipboard.writeText(
										markdown
									);
									notify("Copied markdown to clipboard :)");
								}
							}}
						>
							Get markdown
						</button>

						<hr />

						<button
							onclick={async () => {
								window.print();
							}}
						>
							Print
						</button>

						<hr />

						<SlideCheck
							text="Enable colors"
							checked={show_colors}
							onchange={(checked) => {
								show_colors = checked;
								save_preference({ show_colors: checked });
							}}
						/>
						{#if navigator.wakeLock}
							<hr />
							<SlideCheck
								text="Keep screen on"
								checked={should_keep_screen_awake}
								onchange={(checked) => {
									should_keep_screen_awake = checked;
									set_wake_lock(checked);
								}}
							/>
						{/if}

						{#if final_data}
							<hr />
							<button
								class="warning"
								onclick={async () => {
									recipe_to_delete = url;
								}}
							>
								Delete recipe
							</button>
						{/if}
					</div>
				{/snippet}
			</HamburgerMenu>
		{/if}
	{/snippet}
</Toolbar>

<main>
	<div class="pb5 flex-col gap2">
		{#if final_data}
			<div class="flex-col gap1 mb1 mt1">
				<div class="flex-row gap1 mb1 mt1 wrap">
					<div class="flex-row gap1">
						<div class="flex-row">
							<button
								class="choice-button black"
								onclick={() => set_quantity(0.5)}
								class:selected={equals(current_quantity, 0.5)}
							>
								0.5x
							</button>
							<button
								class="choice-button black"
								onclick={() => set_quantity(1.0)}
								class:selected={equals(current_quantity, 1.0)}
							>
								1x
							</button>
							<button
								class="choice-button black"
								onclick={() => set_quantity(2.0)}
								class:selected={equals(current_quantity, 2.0)}
							>
								2x
							</button>
						</div>
					</div>

					<div class="flex-row">
						<button
							class="choice-button black"
							onclick={() => set_units(UNITS.IMPERIAL)}
							class:selected={current_units == UNITS.IMPERIAL}
						>
							Imperial
						</button>
						<button
							class="choice-button black"
							onclick={() => set_units(UNITS.ORIGINAL)}
							class:selected={current_units == UNITS.ORIGINAL}
						>
							Original
						</button>
						<button
							class="choice-button black"
							onclick={() => set_units(UNITS.METRIC)}
							class:selected={current_units == UNITS.METRIC}
						>
							Metric
						</button>
					</div>
				</div>
			</div>

			{#if $last_list_id !== null}
				<div class="flex-row gap1 flex-end">
					{#if exists_in_list}
						<!-- <div class="vertically-centered p1">
							✅ Recipe is in current list
						</div> -->

						<button
							class="rounded red shrink p1 flex-row vertically-centered gap0_5"
							onclick={() => {
								remove_recipe_from_list($last_list_id!);
							}}
						>
							<TrashCanIcon />
							Remove recipe from current list
						</button>
					{:else}
						<button
							class="rounded blue shrink p1"
							onclick={() => {
								add_recipe_to_list($last_list_id!);
							}}
						>
							Add recipe to current list
						</button>
					{/if}

					<!-- <button
					class="rounded blue"
					onclick={() => {
						// TODO
					}}
				>
					Add recipe to list
				</button> -->
				</div>
			{/if}

			{#each meta_sections as sections}
				{#each sections as section}
					{@render render_section(section, false)}
				{/each}
			{/each}
		{:else}
			<h2>No recipe :/</h2>
			<Help />
		{/if}
	</div>

	<AddRecipeFloater />

	{#if recipe_to_delete}
		<Popup
			text="Are you sure?"
			accept={() => {
				if (recipe_to_delete) {
					delete_recipe(get_all_recipes(), recipe_to_delete);
					recipe_to_delete = null;
					goto("/my-recipes", { page_data: { is_going_back: true } });
				}
			}}
			cancel={() => {
				recipe_to_delete = null;
			}}
		/>
	{/if}
</main>

{#if section_to_focus}
	<Pane content={render_focused_section}></Pane>
{/if}

{#snippet render_focused_section()}
	{@render render_section(section_to_focus!, true)}
{/snippet}

{#snippet render_section(section: ISection, isFocused: boolean)}
	<List
		{section}
		{isFocused}
		{selectedKeyword}
		{checkedItems}
		onHighlightKeyword={(keyword) => {
			if (keyword === selectedKeyword) {
				selectedKeyword = null;
			} else {
				selectedKeyword = keyword;
			}
		}}
		onFocusSection={(_section) => {
			if (isFocused) {
				section_to_focus = null;
			} else {
				section_to_focus = section;
			}
		}}
	/>
{/snippet}
