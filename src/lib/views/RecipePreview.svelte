<script lang="ts">
	import { UNITS } from "$lib/constants";
	import { fix_data, get_meta_sections } from "$lib/data";
	import type { IRecipe, ISection } from "$lib/types";
	import PreviewList from "./PreviewList.svelte";

	let { recipe, line_to_focus, show_colors } = $props<{
		recipe: IRecipe | null;
		line_to_focus?: string;
		show_colors: boolean;
	}>();

	const final_data = $derived(fix_data($state.snapshot(recipe), show_colors));
	let current_units = $state(UNITS.ORIGINAL);
	let current_quantity = $state(1.0);

	let meta_sections = $derived(
		get_meta_sections(
			final_data,
			show_colors,
			current_units,
			current_quantity
		)
	);
</script>

<h2>
	{recipe?.title}
</h2>

<div class="flex-col gap1">
	{#each meta_sections as sections}
		{#each sections as section}
			{@render render_section(section)}
		{/each}
	{/each}
</div>

{#snippet render_section(section: ISection)}
	<PreviewList {section} {line_to_focus} />
{/snippet}
