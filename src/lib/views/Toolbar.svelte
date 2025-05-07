<script lang="ts">
	import { installPrompt } from "$lib/globals.svelte";
	import { goto } from "$lib/utils";
	import type { Snippet } from "svelte";

	let { back_path, title, extra_buttons } = $props<{
		extra_buttons?: Snippet;
		back_path?: string;
		title?: string;
	}>();
</script>

{#snippet title_comp()}
	{#if title}
		<div class="mw0">
			<h1 {title}>
				{title}
			</h1>
		</div>
	{/if}
{/snippet}

<nav class="full-width flex-col pb1">
	<div class="full-width wrap">
		<div class="flex-row grow shrink-children flex-start mw0 ml0_5 p0_5">
			{#if back_path}
				<button
					class="shrink white-text flex-row vertically-centered p0 gap0_5 mw0"
					onclick={() => goto(back_path, { is_going_back: true })}
					aria-label="Go back"
				>
					<svg
						height="16px"
						width="16px"
						style="min-width: 16px"
						viewBox="0 0 278.57599 288.16"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="m239.824 111.168h136.416l-142.4 144.08 142.4 144.08h-136.416l-142.16-144.08z"
							style="fill:white;"
							transform="translate(-97.664 -111.168)"
						/></svg
					>
					{@render title_comp()}
				</button>
			{:else}
				{@render title_comp()}
			{/if}
		</div>

		{#if $installPrompt}
			<div class="flex-row shrink-children flex-start mla">
				<button
					onclick={async () => {
						await $installPrompt.prompt();
						$installPrompt = null;
					}}
				>
					Install
				</button>
			</div>
		{/if}
	</div>

	{#if extra_buttons}
		<div
			class="flex-row grow shrink-children flex-end gap1 wrap extra-buttons pr1"
		>
			{@render extra_buttons()}
		</div>
	{/if}
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
		white-space: nowrap;
	}
</style>
