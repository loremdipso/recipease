<script lang="ts">
	import type { Snippet } from "svelte";

	let { title, content, start_collapsed } = $props<{
		title?: Snippet;
		content?: Snippet;
		start_collapsed?: boolean;
	}>();

	let collapsed = $state(Boolean(start_collapsed));
</script>

<div
	class="card"
	onclick={(event) => {
		event.stopPropagation();
		collapsed = !collapsed;
	}}
	onkeypress={() => {}}
	tabindex="0"
	role="button"
>
	{@render title()}

	{#if !collapsed}
		{@render content()}
	{/if}
</div>
