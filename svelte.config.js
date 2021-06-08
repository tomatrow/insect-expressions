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
        adapter: adapter(),

        // hydrate the <div id="svelte"> element in src/app.html
        target: "#svelte",

        // prerender: {
        // 	crawl: true,
        // 	enabled: true,
        // 	force: true,
        // 	pages: ["*", "/account/activate/id/token", "/account/orders/handle", "/account/reset/id/token", "/blogs/blog_handle", "/blogs/blog_handle/article_handle"]
        // },

        ssr: false,

        vite: {
            // resolve: {
            //     alias: {
            //         $common: resolve("src/common"),
            //         $types: resolve("src/types")
            //     }
            // },
            plugins: [
                format({
                    load: true // I think this fixes certain issues
                })
            ],
            server: {
                proxy: {
                    "^/.*section_id.*": {
                        target: process.env.SHOPIFY_PREVIEW_URL,
                        changeOrigin: true
                    }
                }
            },
            build: {
                // cssCodeSplit: false,
                // brotliSize: false,
                // manifest: true,
                // terserOptions: {
                //     format: {
                //         comments: false
                //     }
                // },
                // rollupOptions: {
                //     // input: "src/index.js",
                //     output: {
                //         assetFileNames() {
                //             return "bundle.css"
                //         },
                //         entryFileNames() {
                //             return "bundle.js"
                //         },
                //         manualChunks() {
                //             return "bundle"
                //         }
                //     }
                // }
            }
        }
    }
}

export default config