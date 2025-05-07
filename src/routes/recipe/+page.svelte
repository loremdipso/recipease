<script lang="ts">
	import Help from "$lib/views/Help.svelte";
	import List from "$lib/views/List.svelte";
	import Pane from "$lib/views/Pane.svelte";
	import SlideCheck from "$lib/views/SlideCheck.svelte";
	import { UNITS } from "$lib/constants";
	import { data_to_markdown_string } from "$lib/renderers";
	import { equals, get_query_url } from "$lib/utils";
	import { fix_data, get_meta_sections, try_load_url } from "$lib/data";
	import { get_preference, save_preference } from "$lib/preferences";
	import { notify } from "$lib/globals.svelte";
	import { onMount } from "svelte";
	import { set_wake_lock } from "$lib/wake_lock";
	import { type IRecipe, type ISection } from "$lib/types";
	import { writable } from "svelte/store";
	import { goto } from "$app/navigation";
	import Toolbar from "$lib/views/Toolbar.svelte";

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

	let installPrompt = $state<any>(null);
	window.addEventListener("beforeinstallprompt", (event) => {
		event.preventDefault();
		installPrompt = event;
	});

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

<Toolbar show_back_button>
	<button class="pink" onclick={() => goto("/my-recipes")}>
		My recipes
	</button>
	<!-- <button
			class="green"
			onclick={async () => {
				data.set(null);
				let new_url = await get_url_from_clipboard();
				if (new_url) {
					url = new_url;
				}
			}}
		>
			Copy from clipboard
		</button> -->
	<button
		class="blue"
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
	{#if navigator.share}
		<button
			id="share-button"
			class="black"
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
		id="install-button"
		class="purple"
		hidden={!installPrompt}
		onclick={async () => {
			await installPrompt.prompt();
			installPrompt = null;
		}}
	>
		Install
	</button>
</Toolbar>

<main>
	<div class="output">
		{#if final_data}
			{#if final_data?.title}
				<h1>{final_data?.title}</h1>
			{/if}

			<div class="flex-row bottom mb1 mt1">
				<div class="flex-col gap1">
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

				<div class="flex-col gap1">
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
						}}>Reload</button
					>
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
			</div>

			{#each meta_sections as sections}
				{#each sections as section}
					{@render render_section(section, false)}
				{/each}
			{/each}
		{:else}
			<Help />
		{/if}
	</div>
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
