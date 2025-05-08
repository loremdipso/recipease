<script lang="ts">
	import type { Snippet } from "svelte";
	import { fade } from "svelte/transition";
	import ClickEater from "./ClickEater.svelte";

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
		<div class="popup">
			<ClickEater>
				{#snippet content()}
					{@render content()}
				{/snippet}
			</ClickEater>
		</div>
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

	.popup {
		background: #535353;
		margin: 1rem;
		padding: 0.5rem;
		border-radius: 10px;
		z-index: 10002;
	}
</style>
