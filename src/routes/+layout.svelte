<script lang="ts">
	import { fly } from "svelte/transition";
	import Notifications from "$lib/views/Notifications.svelte";
	import { page } from "$app/state";
	import "../app.scss";
	import Footer from "$lib/views/Footer.svelte";
	import type { IPageData } from "$lib/types";
	import { previous_page_id } from "$lib/globals.svelte";
	import { beforeNavigate } from "$app/navigation";

	const { children } = $props();
	const page_id = $derived(page.route.id);
	const custom_duration = $derived(
		(page.state as IPageData)?.custom_duration
	);
	const going_back = $derived(
		Boolean((page.state as IPageData)?.is_going_back)
	);
	const duration = $derived(
		custom_duration !== undefined ? Number(custom_duration) : 500
	);

	// Hack to get around sveltekit rerendering junk unnecessarily.
	beforeNavigate((event) => {
		previous_page_id.set(event.from?.route.id || null);
	});
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

<Footer />
