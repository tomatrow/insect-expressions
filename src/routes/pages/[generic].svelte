<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { graphql, query } from "$lib/common/query"
    import { page as loadPage } from "$lib/common/api"

    export const load: Load = async ({ params }) => {
        const { data } = await query(
            graphql`
                query ($handle: String!) {
                    page: pageByHandle(handle: $handle) {
                        id
                        title
                        body
                    }
                }
            `,
            { handle: params.handle }
        )
        return {
            props: data
        }
    }
</script>

<script lang="ts">
    import type { Page } from "$lib/types/shopify-storefront.type"
    export let page: Page

    console.log({ props: $$props })
</script>

<div class="space-y-6 mx-auto py-4 px-5 max-w-3xl">
    <h1 class="text-2xl">{page.title}</h1>
    <div class="injected-content">
        {@html page.body}
    </div>
</div>
