<script lang="ts">
	import DownChevron from "$lib/icons/down_chevron.svelte";
	import UpChevron from "$lib/icons/up_chevron.svelte";
	import type { Snippet } from "svelte";

	let { title, content, start_collapsed } = $props<{
		title: string;
		content: Snippet;
		start_collapsed?: boolean;
	}>();

	let collapsed = $state(Boolean(start_collapsed));
</script>

<div class="card flex-col">
	<button
		class="black flex-row vertically-centered left"
		onclick={(event) => {
			event.stopPropagation();
			collapsed = !collapsed;
		}}
	>
		<h2 class="grow">{title}</h2>
		{#if !collapsed}
			<UpChevron />
		{:else}
			<DownChevron />
		{/if}
	</button>

	{#if !collapsed}
		{@render content()}
	{/if}
</div>
