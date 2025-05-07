import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	// base: "./",
	// build: {
	// 	emptyOutDir: true,
	// },
	// server: {
	// 	port: 8080,
	// 	fs: {
	// 		strict: false,
	// 	},
	// },
});
