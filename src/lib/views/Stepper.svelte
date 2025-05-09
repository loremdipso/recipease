<script lang="ts">
	import type { Snippet } from "svelte";

	let { title, step1, step2, step3, step4, step5 } = $props<{
		title?: Snippet<[number]>;
		step1?: Snippet;
		step2?: Snippet;
		step3?: Snippet;
		step4?: Snippet;
		step5?: Snippet;
	}>();

	let current_step = $state(0);
	let num_steps = $derived(
		(step1 ? 1 : 0) +
			(step2 ? 1 : 0) +
			(step3 ? 1 : 0) +
			(step4 ? 1 : 0) +
			(step5 ? 1 : 0)
	);
	let done = $derived(current_step >= num_steps);

	function forward() {
		current_step += 1;
	}

	function back() {
		current_step += 1;
	}
</script>

<div class="flex-row vertically-centered">
	{#each { length: num_steps }, i}
		<button class:selected={i === current_step}>
			{@render title(i)}
		</button>
		{#if i < num_steps - 1}
			<hr class="grow grey-text" />
		{/if}
	{/each}
</div>
{#if done}
	<h2>Done :)</h2>
{:else if current_step === 0}
	{@render step1()}
{:else if current_step === 1}
	{@render step2()}
{:else if current_step === 2}
	{@render step3()}
{:else if current_step === 3}
	{@render step4()}
{:else if current_step === 4}
	{@render step5()}
{/if}
