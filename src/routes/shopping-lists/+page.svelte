<script>
	import { get_url } from "$lib/utils";
	import Toolbar from "$lib/views/Toolbar.svelte";
</script>

<Toolbar title="Shopping lists" back_path="/" />

<main>
	<div class="card">
		<a href={get_url("/shopping-lists/new")}>Create new</a>
	</div>
</main>
