import { resolve } from "path"
import format from "@tomatrow/zen-format"
import sveltePreprocess from "svelte-preprocess"
import adapter from "./scripts/adapter/index.js"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        sveltePreprocess({
            postcss: true
        })
    ],
    kit: {
        // By default, `npm run build` will create a standard Node app.
        // You can create optimized builds for different platforms by
        // specifying a different adapter
        adapter: adapter(),

        // hydrate the <div id="svelte"> element in src/app.html
        target: "#svelte",
        vite: {
            plugins: [
                format({
                    load: true // I think this fixes certain issues
                })
            ]
        }
    }
}

export default config