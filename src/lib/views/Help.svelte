<script>
	import Mascot from "$lib/icons/mascot.svelte";
	import { get_url_from_clipboard, goto } from "$lib/utils";
</script>

<div class="flex-col gap1">
	<div class="card">
		<div class="flex-col gap1">
			<h2>Welcome to RecipEase!</h2>

			<div>
				<div class="mr1" style="float: left">
					<Mascot />
				</div>

				<p class="mb1">
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
						copy
					</button>
					a recipe from your clipboard and see where that takes you.
				</p>
			</div>
		</div>
	</div>

	<div class="card flex-col gap1">
		<h2>But what even is this?</h2>

		<p>
			Right now this is a mostly personal website I use to get recipes
			from recipe website and then do fun stuff with them. Not that I
			don't love the stories, but like enough already.
		</p>

		<p>
			I don't operate any kind of database or server or anything, so all
			the recipes you get through this site are only stored on your local
			device. If you clear your browser then your recipes will be lost.
		</p>
	</div>
</div>
