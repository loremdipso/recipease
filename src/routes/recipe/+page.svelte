<script lang="ts">
	import List from "$lib/views/List.svelte";
	import Pane from "$lib/views/Pane.svelte";
	import SlideCheck from "$lib/views/SlideCheck.svelte";
	import { UNITS } from "$lib/constants";
	import { data_to_markdown_string } from "$lib/renderers";
	import { equals, get_query_url, goto } from "$lib/utils";
	import { fix_data, get_meta_sections, try_load_url } from "$lib/data";
	import { get_preference, save_preference } from "$lib/preferences";
	import { notify } from "$lib/globals.svelte";
	import { onMount } from "svelte";
	import { set_wake_lock } from "$lib/wake_lock";
	import { type IRecipe, type ISection } from "$lib/types";
	import { writable } from "svelte/store";
	import Toolbar from "$lib/views/Toolbar.svelte";
	import Help from "$lib/views/Help.svelte";
	import AddRecipeFloater from "$lib/views/AddRecipeFloater.svelte";

	let url = $state(get_query_url());

	const data = writable<IRecipe | null>(null);
	let current_units = $state(UNITS.ORIGINAL);
	let current_quantity = $state(1.0);
	let show_colors = $state(get_preference("show_colors"));
	const final_data = $derived(fix_data($data, show_colors));

	let selectedKeyword = $state<string | null>(null);
	let checkedItems = $state<{ [key: string]: boolean }>({});
	let section_to_focus = $state<ISection | null>(null);

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

	const initial_keep_screen_awake_value = $state(
		get_preference("keep_screen_awake")
	);

	// Set wake lock to true by default
	onMount(() => {
		(async () => {
			await set_wake_lock(initial_keep_screen_awake_value, false);
		})();

		return async () => {
			await set_wake_lock(false, false);
		};
	});
</script>

<Toolbar back_path="/my-recipes" title={final_data?.title}>
	{#snippet extra_buttons()}
		{#if navigator.share || true}
			<button
				id="share-button"
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
			disabled={!final_data}
			onclick={async () => {
				if (final_data) {
					let markdown = data_to_markdown_string(final_data);
					await navigator.clipboard.writeText(markdown);
					notify("Copied markdown to clipboard :)");
				}
			}}
		>
			Get markdown
		</button>

		<a
			href={url}
			class="button-like"
			target="_blank"
			class:disabled={!Boolean(url)}
		>
			Open the original
		</a>

		<button
			onclick={async () => {
				if (url) {
					notify("Reloading...");
					await reload_data(true);
				} else {
					notify("No url!", "error");
				}
			}}
			aria-label="Reload"
		>
			<svg
				fill="#000000"
				height="16px"
				width="16px"
				version="1.1"
				id="Capa_1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 489.533 489.533"
				xml:space="preserve"
				><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				></g><g id="SVGRepo_iconCarrier">
					<g>
						<path
							style="fill:white;"
							d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9 l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6 c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6 C49.575,418.961,150.875,501.261,268.175,488.161z"
						></path>
					</g>
				</g></svg
			>
		</button>
	{/snippet}
</Toolbar>

<main>
	<div class="pb5 flex-col gap2">
		{#if final_data}
			<div class="flex-col gap1 mb1 mt1">
				<div class="flex-row gap1 flex-end wrap">
					<SlideCheck
						text="Enable colors"
						checked={show_colors}
						onchange={(checked) => {
							show_colors = checked;
							save_preference({ show_colors: checked });
						}}
					/>
					{#if navigator.wakeLock}
						<SlideCheck
							text="Keep screen on"
							checked={initial_keep_screen_awake_value}
							onchange={(checked) => {
								set_wake_lock(checked);
							}}
						/>
					{/if}
				</div>

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
