<script lang="ts">
	import type { Snippet } from "svelte";

	let { content } = $props<{
		content: Snippet;
	}>();
</script>

<div
	onclick={(event) => {
		event.stopPropagation();
	}}
	onkeypress={() => {}}
	tabindex="0"
	role="button"
>
	{@render content()}
</div>
