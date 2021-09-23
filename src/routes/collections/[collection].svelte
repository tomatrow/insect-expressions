<script lang="ts" context="module">
    import { collection } from "$lib/common/api"
    import type { Load } from "@sveltejs/kit"
    export const load: Load = async ({ page }) => {
        return {
            props: await collection(page.params?.collection)
        }
    }
</script>

<script lang="ts">
    import { formatMoney } from "$lib/common/utility"
    import type { Image, ProductConnection } from "shopify-storefront-api-typings"

    export let id: string
    export let title: string
    export let image: Image
    export let descriptionHtml: string
    export let products: ProductConnection
    id
    image
</script>

<h1 class="text-dark pt-4 text-4xl">{title}</h1>
<div class="text-dark space-y-2 my-4">{@html descriptionHtml}</div>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 text-black">
    {#each products.edges.map(edge => edge.node) as { title, images, handle, priceRange }}
        <a href="/products/{handle}" class="space-y-2">
            <img
                class="w-full h-auto"
                src={images.edges[0].node.originalSrc}
                alt={images.edges[0].node.altText}
            />
            <h2 class="text-center font-bold">{title}</h2>
            <span class="text-sm">Base Price: {formatMoney(priceRange.minVariantPrice.amount)}</span
            >
        </a>
    {/each}
</div>
