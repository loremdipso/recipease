<script lang="ts">
	import { installPrompt } from "$lib/globals.svelte";
	import { goto } from "$lib/utils";
	import type { Snippet } from "svelte";
	import PreferencesButton from "./PreferencesButton.svelte";

	let { title, back_path, extra_buttons, title_snippet } = $props<{
		title?: string;
		back_path?: string;
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
					onclick={() => goto(back_path, { is_going_back: true })}
					title="Go back"
					aria-label="Go back"
				>
					<svg
						height="16px"
						width="16px"
						style="min-width: 16px"
						viewBox="0 0 278.57599 288.16"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="m239.824 111.168h136.416l-142.4 144.08 142.4 144.08h-136.416l-142.16-144.08z"
							style="fill:white;"
							transform="translate(-97.664 -111.168)"
						/>
					</svg>

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
		class="flex-row grow shrink-children flex-start gap1 wrap extra-buttons pr1 no-print"
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
