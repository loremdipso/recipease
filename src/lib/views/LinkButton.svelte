<script lang="ts">
	import { get_url, go_back_to, go_forward_to } from "$lib/utils";

	let { url, text, go_back, query_params } = $props<{
		url: string;
		text: string;
		go_back: boolean;
		query_params?: { [key: string]: any };
	}>();
</script>

<a
	class="button-like"
	href={get_url(url)}
	onclick={() => {
		if (go_back) {
			go_back_to(url, query_params);
		} else {
			go_forward_to(url, query_params);
		}
	}}
>
	{text}
</a>
