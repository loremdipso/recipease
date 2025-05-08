<script lang="ts">
	import CopyIcon from "$lib/icons/copy_icon.svelte";
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
	title="Copy recipe url from clipboard"
	aria-label="Copy recipe url from clipboard"
>
	<CopyIcon />
</button>

<style lang="scss">
	.floating-button {
		z-index: 100;
		border-radius: 50%;
		aspect-ratio: 1/1;
		margin: 0;
		padding: 1rem;
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		// display: flex;
		// flex-direction: column;
		// justify-content: center;
	}
</style>
