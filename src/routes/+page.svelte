<script lang="ts">
	import { goto } from "$app/navigation";
	import Toolbar from "$lib/views/Toolbar.svelte";
	import { base } from "$app/paths";
</script>

<Toolbar title="RecipEase">
	<button
		class="blue"
		onclick={() => {
			goto(`${base}/my-recipes`);
		}}
	>
		<a href={`${base}/my-recipes`}> My Recipes </a>
	</button>
</Toolbar>
