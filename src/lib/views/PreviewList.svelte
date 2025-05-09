<script lang="ts">
	import { FragmentType, type IFragment, type ISection } from "$lib/types";

	let { section, line_to_focus } = $props<{
		section: ISection;
		line_to_focus?: number;
	}>();

	function get_class(fragment: IFragment): string {
		switch (fragment.type) {
			case FragmentType.Ingredient:
				return "ingredient";
			case FragmentType.Temperature:
				return "temperature";
			case FragmentType.Amount:
				return "amount";
			default:
				return "";
		}
	}
</script>

<div>
	<header class="flex-row vertically-centered gap1">
		{#if section.level === 2}
			<h2>{section.text}</h2>
		{:else if section.level === 3}
			<h3>{section.text}</h3>
		{:else if section.level === 4}
			<h4>{section.text}</h4>
		{/if}
	</header>

	<div class="list">
		{#each section.rows as row, i}
			<div class:selected={row.original === line_to_focus}>
				<div>
					{#each row.fragments as fragment}
						{#if fragment.type === FragmentType.Plain}
							<span>{fragment.text}</span>
						{:else if fragment.type === FragmentType.Bold}
							<b>{fragment.text}</b>
						{:else if fragment.type === FragmentType.Italic}
							<b>{fragment.text}</b>
						{:else}
							<span
								class={get_class(fragment)}
								class:failed={fragment.failed}
								class:converted={fragment.converted}
							>
								{fragment.text}
							</span>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
