<script lang="ts">
	import Overlay from "./Overlay.svelte";

	let { text, accept, cancel } = $props<{
		text: String;
		accept: () => void;
		cancel: () => void;
	}>();
</script>

<Overlay click={cancel}>
	{#snippet content()}
		<div class="popup flex-col">
			<h1>{text}</h1>

			<div class="mla">
				<button
					onclick={(event) => {
						event.stopPropagation();
						cancel();
					}}
				>
					Cancel
				</button>
				<button
					onclick={(event) => {
						event.stopPropagation();
						accept();
					}}
				>
					Accept
				</button>
			</div>
		</div>
	{/snippet}
</Overlay>

<style lang="scss">
	.popup {
		background: #535353;
		margin: 1rem;
		padding: 0.5rem;
		border-radius: 10px;
		z-index: 10002;
	}
</style>
