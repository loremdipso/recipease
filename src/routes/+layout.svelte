<script lang="ts">
	import { fly } from "svelte/transition";
	import Notifications from "$lib/views/Notifications.svelte";
	import { page } from "$app/state";
	import "../app.scss";
	import Footer from "$lib/views/Footer.svelte";
	import type { IPageData } from "$lib/types";

	const { children } = $props();
	const page_id = $derived(page.route.id);
	const skip_animation = $derived(
		Boolean((page.state as IPageData)?.skip_animation)
	);
	const going_back = $derived(
		Boolean((page.state as IPageData)?.is_going_back)
	);
	const duration = $derived(skip_animation ? 0 : 500);
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
