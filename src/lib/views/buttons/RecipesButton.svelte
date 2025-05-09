<script lang="ts">
	import LinkButton from "../LinkButton.svelte";

	let { go_back } = $props<{
		go_back?: boolean;
	}>();
</script>

<LinkButton text="Recipes" url="/my-recipes" {go_back} />
