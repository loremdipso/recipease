<script lang="ts">
	import { goto } from "$app/navigation";

	let { show_back_button, title } = $props<{
		show_back_button?: boolean;
		title?: string;
	}>();
</script>

<nav>
	<!-- <a href="/">home</a>
	<a href="/about">about</a> -->
	<div class="full-width pb1 right">
		{#if show_back_button}
			<button class="pink shrink" onclick={() => goto("/")}>Back</button>
		{/if}

		<slot></slot>

		{#if title}
			<h2 class="grow no-margin flex end center">
				<span class="mr1">
					{title}
				</span>
			</h2>
		{/if}
	</div>
</nav>

<style lang="scss">
	nav {
		background-color: rgb(0, 98, 98);
	}
</style>
