<script lang="ts">
	import GearIcon from "$lib/icons/gear_icon.svelte";
	import Preferences from "./Preferences.svelte";

	let opened = $state(false);
	function cancel() {
		opened = false;
	}
</script>

<button
	title="Edit preferences"
	aria-label="Edit preferences"
	onclick={() => {
		opened = !opened;
	}}
>
	<GearIcon />
</button>

{#if opened}
	<Preferences {cancel} />
{/if}
