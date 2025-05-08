<script lang="ts">
	import type { Snippet } from "svelte";
	import Overlay from "./Overlay.svelte";
	import { fade } from "svelte/transition";
	import MenuIcon from "$lib/icons/menu_icon.svelte";

	let { items } = $props<{
		items: Snippet;
	}>();

	let opened = $state(false);
	const duration = 200;
</script>

<button
	title="Open menu"
	aria-label="Open menu"
	onclick={() => {
		opened = !opened;
	}}
>
	<MenuIcon />

	{#if opened}
		<div
			in:fade={{ duration }}
			out:fade={{ duration }}
			class="dropdown-menu"
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
		position: absolute;
		z-index: 10001;
		padding: 0.5rem;
		border-radius: 10px;

		// TODO: add a pointy radius here
		// border-top-right-radius: 0;
		transform: translateX(calc(-100% + 1rem));
		width: 250px;
	}
</style>
