<script lang="ts">
	import { fly } from "svelte/transition";
	import GithubCorner from "$lib/views/GithubCorner.svelte";
	import Notifications from "$lib/views/Notifications.svelte";
	import { page } from "$app/state";
	import "../app.scss";

	const { children } = $props();
	const page_id = $derived(page.route.id);
	const going_back = $derived(Boolean((page.state as any)?.is_going_back));
	const duration = 500;
</script>

{#key page_id}
	<div
		in:fly={{ x: going_back ? "-100%" : "100%", duration }}
		out:fly={{ x: going_back ? "100%" : "-100%", duration }}
		class="transition-container"
	>
		{@render children()}
	</div>
{/key}

<Notifications />

<GithubCorner url="https://github.com/loremdipso/recipe-scraper" />
