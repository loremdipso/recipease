<script>
	import { get_url } from "$lib/utils";
</script>

<div class="footer no-print">
	<a href={get_url("/privacy-policy")}> Privacy Policy </a>
	<a href={get_url("/terms")}>Terms of Service</a>
	<a href="https://github.com/loremdipso/recipease/issues/new">Contact us</a>
</div>

<style lang="scss">
	a {
		color: white;
	}

	.footer {
		position: fixed;
		font-size: 10px;
		display: flex;
		width: 100%;
		justify-content: space-around;
		background: black;
		bottom: 0;
	}
</style>
