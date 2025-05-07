<script>
	import { get_url_from_clipboard, goto } from "$lib/utils";
</script>

<div class="card">
	<div class="flex-col gap1">
		<p>Welcome to recipe scraper!</p>
		<p>
			New here? <a
				href="https://github.com/loremdipso/recipease?tab=readme-ov-file#recipease"
				target="_blank">Here</a
			> are some instructions to get you started.
		</p>

		<p>
			Or you can
			<button
				class="p0 green-text"
				onclick={async () => {
					let url = await get_url_from_clipboard();
					if (url) {
						goto(`/recipe`, { query_params: { url } });
					}
				}}
			>
				copy a recipe from your clipboard
			</button>.
		</p>
	</div>
</div>
