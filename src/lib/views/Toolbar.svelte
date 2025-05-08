<script lang="ts">
	import { installPrompt } from "$lib/globals.svelte";
	import { goto } from "$lib/utils";
	import type { Snippet } from "svelte";
	import PreferencesButton from "./PreferencesButton.svelte";
	import BackArrowIcon from "$lib/icons/back_arrow_icon.svelte";

	let { title, back_path, extra_buttons, title_snippet } = $props<{
		title?: string;
		back_path?: string;
		page_data?: { [key: string]: string | null };
		extra_buttons?: Snippet;
		title_snippet?: Snippet;
	}>();
</script>

{#snippet title_comp()}
	{#if title}
		<div class="mw0">
			<h1 {title}>
				{title}
			</h1>
		</div>
	{:else if title_snippet}
		{@render title_snippet()}
	{/if}
{/snippet}

<nav class="full-width flex-col pb1">
	<div class="full-width wrap">
		<div class="flex-row grow flex-start ml0_5 p0_5 gap0_5">
			{#if back_path}
				<button
					class="shrink white-text flex-row vertically-centered p0 gap0_5"
					onclick={() =>
						goto(back_path, { page_data: { is_going_back: true } })}
					title="Go back"
					aria-label="Go back"
				>
					<BackArrowIcon />

					{#if !title_snippet}
						{@render title_comp()}
					{/if}
				</button>

				{#if title_snippet}
					{@render title_comp()}
				{/if}
			{:else}
				{@render title_comp()}
			{/if}
		</div>
	</div>

	<div
		class="flex-row grow shrink-children flex-start gap1 wrap extra-buttons pr1 pl1 no-print"
	>
		{#if $installPrompt}
			<button
				onclick={async () => {
					await $installPrompt.prompt();
					$installPrompt = null;
				}}
			>
				Install
			</button>
		{/if}

		{#if extra_buttons}
			{@render extra_buttons()}
		{/if}

		<div class="vertically-centered mla">
			<PreferencesButton />
		</div>
	</div>
</nav>

<style lang="scss">
	nav {
		background-color: #000305;
	}

	.extra-buttons {
		background-color: #1b1b1b;
	}

	h1 {
		overflow-x: hidden;
		text-overflow: ellipsis;
		// I tried this, but recipe names are hella long
		// white-space: nowrap;
	}
</style>
