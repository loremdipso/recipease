<script lang="ts">
	import Overlay from "./Overlay.svelte";

	let { cancel } = $props<{
		cancel: () => void;
	}>();
</script>

<Overlay click={cancel}>
	{#snippet content()}
		<div class="flex-col">
			<h1>Preferences</h1>
			<p>TODO</p>
		</div>
	{/snippet}
</Overlay>
