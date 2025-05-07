<script lang="ts">
	import { goto } from "$app/navigation";
	import Toolbar from "$lib/views/Toolbar.svelte";
</script>

<Toolbar title="RecipEase">
	<button
		class="blue"
		onclick={() => {
			goto("/my-recipes");
		}}
	>
		My Recipes
	</button>
</Toolbar>
