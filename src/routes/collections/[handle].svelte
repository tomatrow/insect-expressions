<script lang="ts" context="module">
    import { collection } from "../../common/api"
    import type { LoadOptions, Loaded } from "../../types/index.type"
    export async function load(options: LoadOptions): Promise<Loaded> {
        console.log("/collections", options)
        const { handle } = options.page.params as { handle: string }
        return {
            props: await collection(handle)
        }
    }
</script>

<script lang="ts">
    import { formatMoney } from "../../common/utility"
    import type { Image, ProductConnection } from "shopify-storefront-api-typings"
    export let id: string 
    id
    
    export let title: string 
    export let image: Image 
    image
    export let descriptionHtml: string 
    
    export let products: ProductConnection
    
</script>

<h1>{title}</h1>
{@html descriptionHtml}
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    {#each products.edges.map(edge => edge.node) as { title, images, handle, priceRange }}
        <a href="/products/{handle}">
            <img class="w-full h-auto" src={images.edges[0].node.originalSrc} alt={images.edges[0].node.altText} />
            <h2 class="text-center">{title}</h2>
            <span>Base Price: {formatMoney(priceRange.minVariantPrice.amount)}</span>
        </a>
    {/each}
</div>