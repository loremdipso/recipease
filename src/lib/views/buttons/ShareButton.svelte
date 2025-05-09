<script lang="ts">
	import ShareIcon from "$lib/icons/share_icon.svelte";

	let { onshare } = $props<{
		onshare: () => void | Promise<void>;
	}>();
</script>

{#if navigator.share as any}
	<button
		onclick={() => {
			onshare();
		}}
		title="Share"
		aria-label="Share"
	>
		<ShareIcon />
	</button>
{/if}
