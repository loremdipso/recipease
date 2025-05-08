<script lang="ts">
	import List from "$lib/views/List.svelte";
	import Pane from "$lib/views/Pane.svelte";
	import SlideCheck from "$lib/views/SlideCheck.svelte";
	import { UNITS } from "$lib/constants";
	import { data_to_markdown_string } from "$lib/renderers";
	import { equals, get_query_url, goto } from "$lib/utils";
	import {
		delete_recipe,
		fix_data,
		get_all_recipes,
		get_meta_sections,
		try_load_url,
		update_recipe,
	} from "$lib/data";
	import { get_preference, save_preference } from "$lib/preferences";
	import { notify } from "$lib/globals.svelte";
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

	let url = $state<string | null>(null);

	afterNavigate(() => {
		url = get_query_url();
	});

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

<Toolbar back_path="/my-recipes">
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
							goto("/my-recipes", { is_going_back: true })}
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
					<svg
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						width="16px"
						height="16px"
						style="min-width: 16px"
						fill="#000000"
					>
						<g
							stroke="none"
							stroke-width="1"
							fill="none"
							fill-rule="evenodd"
						>
							<g
								transform="translate(-154.000000, -517.000000)"
								fill="#ffffff"
							>
								<path
									d="M172,522 C172,521.447 172.448,521 173,521 C173.552,521 174,521.447 174,522 L174,526 C174,526.553 173.552,527 173,527 C172.448,527 172,526.553 172,526 L172,522 L172,522 Z M163,529 L177,529 C177.552,529 178,528.553 178,528 L178,517 L162,517 L162,528 C162,528.553 162.448,529 163,529 L163,529 Z M182,517 L180,517 L180,529 C180,530.104 179.104,531 178,531 L162,531 C160.896,531 160,530.104 160,529 L160,517 L158,517 C155.791,517 154,518.791 154,521 L154,545 C154,547.209 155.791,549 158,549 L182,549 C184.209,549 186,547.209 186,545 L186,521 C186,518.791 184.209,517 182,517 L182,517 Z"
								>
								</path>
							</g>
						</g>
					</svg>
				{:else}
					<svg
						width="16px"
						height="16px"
						style="min-width: 16px"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g>
							<path
								d="M8.29289 3.70711L1 11V15H5L12.2929 7.70711L8.29289 3.70711Z"
								fill="#ffffff"
							></path>
							<path
								d="M9.70711 2.29289L13.7071 6.29289L15.1716 4.82843C15.702 4.29799 16 3.57857 16 2.82843C16 1.26633 14.7337 0 13.1716 0C12.4214 0 11.702 0.297995 11.1716 0.828428L9.70711 2.29289Z"
								fill="#ffffff"
							></path>
						</g>
					</svg>
				{/if}
			</button>
		</div>
	{/snippet}
	{#snippet extra_buttons()}
		{#if final_data && navigator.share}
			<button
				onclick={async () => {
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
			>
				Share
			</button>
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
			<svg
				fill="#000000"
				height="16px"
				width="16px"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 489.533 489.533"
				xml:space="preserve"
				><g stroke-width="0"></g><g
					stroke-linecap="round"
					stroke-linejoin="round"
				></g><g>
					<g>
						<path
							style="fill:white;"
							d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9 l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6 c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6 C49.575,418.961,150.875,501.261,268.175,488.161z"
						></path>
					</g>
				</g></svg
			>
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
								class="rounded-button black"
								onclick={() => set_quantity(0.5)}
								class:selected={equals(current_quantity, 0.5)}
							>
								0.5x
							</button>
							<button
								class="rounded-button black"
								onclick={() => set_quantity(1.0)}
								class:selected={equals(current_quantity, 1.0)}
							>
								1x
							</button>
							<button
								class="rounded-button black"
								onclick={() => set_quantity(2.0)}
								class:selected={equals(current_quantity, 2.0)}
							>
								2x
							</button>
						</div>
					</div>

					<div class="flex-row">
						<button
							class="rounded-button black"
							onclick={() => set_units(UNITS.IMPERIAL)}
							class:selected={current_units == UNITS.IMPERIAL}
						>
							Imperial
						</button>
						<button
							class="rounded-button black"
							onclick={() => set_units(UNITS.ORIGINAL)}
							class:selected={current_units == UNITS.ORIGINAL}
						>
							Original
						</button>
						<button
							class="rounded-button black"
							onclick={() => set_units(UNITS.METRIC)}
							class:selected={current_units == UNITS.METRIC}
						>
							Metric
						</button>
					</div>
				</div>
			</div>

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
					goto("/my-recipes", { is_going_back: true });
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
