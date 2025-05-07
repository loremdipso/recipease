<script lang="ts">
	import type { Snippet } from "svelte";
	import { fade } from "svelte/transition";

	let { click, transparent, content } = $props<{
		click: () => void;
		transparent?: boolean;
		content?: Snippet;
	}>();

	const duration = 200;
</script>

<div
	class="overlay"
	in:fade={{ duration }}
	out:fade={{ duration }}
	class:transparent
	onclick={(event) => {
		event.stopPropagation();
		click();
	}}
	onkeypress={() => {}}
	tabindex="0"
	role="button"
>
	{#if content}
		{@render content()}
	{/if}
</div>

<style lang="scss">
	.overlay {
		margin: 0;
		width: 100%;
		z-index: 10000;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.511);
		display: flex;
		flex-direction: column;
		justify-content: center;

		&.transparent {
			background: none;
		}
	}
</style>
