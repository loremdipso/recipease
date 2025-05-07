<script lang="ts">
	let { text, accept, cancel } = $props<{
		text: String;
		accept: () => void;
		cancel: () => void;
	}>();
</script>

<div
	class="overlay"
	onclick={cancel}
	onkeypress={() => {}}
	tabindex="0"
	role="button"
>
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
	}

	.popup {
		background: #535353;
		margin: 1rem;
		padding: 0.5rem;
		border-radius: 10px;
	}
</style>
