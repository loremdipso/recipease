<script lang="ts">
	import type { Snippet } from "svelte";
	import Overlay from "./Overlay.svelte";

	let { items } = $props<{
		items: Snippet;
	}>();

	// let opened = $state(false);
	let opened = $state(true);
</script>

<button
	title="Open menu"
	aria-label="Open menu"
	onclick={() => {
		opened = !opened;
	}}
>
	<svg
		viewBox="0 0 20 20"
		width="16px"
		height="16px"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
	>
		<g stroke-width="0"></g>
		<g stroke-linecap="round" stroke-linejoin="round"></g>
		<g>
			<path
				fill="#ffffff"
				fill-rule="evenodd"
				d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
			></path>
		</g>
	</svg>

	{#if opened}
		<div
			class="dropdown-menu"
			onclick={(event) => {
				event.stopPropagation();
			}}
			onkeypress={() => {}}
			tabindex="0"
			role="button"
		>
			{@render items()}
		</div>
	{/if}
</button>

{#if opened}
	<Overlay
		transparent={true}
		click={() => {
			opened = false;
		}}
	/>
{/if}

<style lang="scss">
	.dropdown-menu {
		background: #282e33;
		position: fixed;
		z-index: 10001;
		padding: 0.5rem;
		border-radius: 10px;
		right: 20px;

		// TODO: add a pointy radius here
		// border-top-right-radius: 0;
		// transform: translateY(10px);
	}
</style>
