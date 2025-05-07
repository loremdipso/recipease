<script lang="ts">
	import GithubCorner from "$lib/views/GithubCorner.svelte";
	import Notifications from "$lib/views/Notifications.svelte";
	import "../app.scss";

	let { children } = $props();
</script>

{@render children()}

<Notifications />

<GithubCorner url="https://github.com/loremdipso/recipe-scraper" />
