const { resolve } = require("path")
const pkg = require("./package.json")
const shopify = require("adapter-shopify")
const sveltePreprocess = require("svelte-preprocess")

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        sveltePreprocess({
            defaults: {
                style: "postcss"
            },
            postcss: true
        })
    ],
    kit: {
        // By default, `npm run build` will create a standard Node app.
        // You can create optimized builds for different platforms by
        // specifying a different adapter
        adapter: shopify(),

        // hydrate the <div id="svelte"> element in src/app.html
        target: "#svelte",

		// prerender: {
		// 	crawl: true,
		// 	enabled: true,
		// 	force: true,
		// 	pages: ["*", "/account/activate/id/token", "/account/orders/handle", "/account/reset/id/token", "/blogs/blog_handle", "/blogs/blog_handle/article_handle"]
		// },
        
        ssr: faslse,
        
        vite: {
            ssr: {
                noExternal: Object.keys(pkg.dependencies || {})
            },
            resolve: {
                alias: {
                    $common: resolve("src/common"),
                    $types: resolve('src/types')
                }
            }
        }
    }
}
