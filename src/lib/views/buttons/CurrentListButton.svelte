<script lang="ts">
	import { last_list_id } from "$lib/globals.svelte";
	import LinkButton from "../LinkButton.svelte";

	let { go_back } = $props<{
		go_back?: boolean;
	}>();
</script>

{#if $last_list_id !== null}
	<LinkButton
		text="Current list"
		url="/shopping-lists/list/view"
		{go_back}
		query_params={{
			id: $last_list_id.toString(),
		}}
	/>
{/if}
