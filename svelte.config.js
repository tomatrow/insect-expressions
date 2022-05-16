import gQueryCodegen from '@leveluptuts/g-query/codegen'
import Icons from 'unplugin-icons/vite'
import preprocess from "svelte-preprocess"
import adapter from "@sveltejs/adapter-netlify"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess({
        postcss: true
    }),
    kit: {
        adapter: adapter(),
        vite: {
            plugins: [
                Icons({
                    compiler: 'svelte'
                }),
                gQueryCodegen({
                    schema: 'src/lib/graphql/schema.graphql', // path to schema, schema is required
                    out: 'src/lib/graphql', // Where you want the general schema types to output
                    gPath: '$lib/common/g' // Path to g, created in step 1.
                    // debug: false
                })
            ]
        }
    }
}

export default config