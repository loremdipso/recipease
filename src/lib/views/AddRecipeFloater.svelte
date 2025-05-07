<script lang="ts">
	import { get_url_from_clipboard, goto } from "$lib/utils";
</script>

<button
	class="green grow m1 floating-button"
	onclick={async () => {
		let url = await get_url_from_clipboard();
		if (url) {
			goto(`/recipe`, { query_params: { url } });
		}
	}}
>
	+
</button>

<style lang="scss">
	.floating-button {
		z-index: 100;
		border-radius: 50%;
		aspect-ratio: 1/1;
		margin: 0;
		padding: 1rem;
		position: fixed;
		bottom: 1rem;
		right: 0;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
